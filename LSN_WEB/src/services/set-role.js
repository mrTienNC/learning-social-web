module.exports = {
  setRole(role) {
    if (role.isCaptain === true && role.isApprove === true) {
      return 'ADMIN';
    } else if (role.isCaptain === false && role.isApprove === true) {
      return 'MEMBER';
    } else {
      return 'GUEST'
    }
  }
}