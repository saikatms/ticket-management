module.exports = function (roles) {
  return function (req, res, next) {
    //   console.log(">>>>>>>", req.user, group);
    //   if (req.user && req.user[group]) {
    //     next();
    //   } else {
    //     return res.status(401).send({ error: "Unauthorized" });
    //   }
    // };
    let isAllowed = false,
      user = req.user;
    console.log("roles", roles);
    roles.forEach(function (role) {
      user.roles.forEach(function (userRole) {
        // roles must be in lowercase
        if (role === userRole) {
          isAllowed = true;
        }
      });
    });

    if (!isAllowed) {
      res.send(401, {
        message: "Not allowed to preform... Kindly contact with admin",
      });
    } else {
      next();
    }
  };
};
