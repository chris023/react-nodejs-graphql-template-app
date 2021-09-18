import { generateHTML } from './generateHTML'
import { encrypt } from '../..'

// Create sendEmail params
const generateDownloadCertificationsEmail = ({
  env,
  certificationIds,
  downloadId,
  organization,
  ToAddresses,
}) => {
  const cipheredDownloadId = encrypt(downloadId)
  let baseUrl

  switch (env) {
    case 'development':
      baseUrl = 'http://localhost:3000'
      break
    case 'production':
      baseUrl = 'http://app.velocitrackers.com'
  }

  return {
    Destination: {
      CcAddresses: [],
      ToAddresses,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: generateHTML({
            organization,
            link: `${baseUrl}/utils/download/${cipheredDownloadId}`,
          }),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `${organization.name} shared ${
          certificationIds.length
        } file(s) with you!`,
      },
    },
    Source: 'do-not-reply@velocitrackers.com',
    ReplyToAddresses: ['help@velocitrackers.com'],
  }
}

export { generateDownloadCertificationsEmail }
