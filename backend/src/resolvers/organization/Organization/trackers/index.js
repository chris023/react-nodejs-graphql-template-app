const trackers = async ({ id }, _args, { models }) => {
  return await models.Tracker.findAll({
    where: {
      organizationId: id,
    },
  })
}

export { trackers }
