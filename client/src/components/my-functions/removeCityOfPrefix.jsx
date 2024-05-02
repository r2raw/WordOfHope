function removeCityOfPrefix(str) {
  if (str.startsWith("City of ")) {
    return str.substring(8);
  }
  return str;
}

export default removeCityOfPrefix;
