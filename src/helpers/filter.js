const filter = (array, string) => {
  const result = [];
  array.forEach(element => {
    if (element.title.toLowerCase().includes(string.toLowerCase().trim())) {
      result.push(element);
    }
  });
  return result;
}

export default filter;