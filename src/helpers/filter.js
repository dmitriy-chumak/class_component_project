const filter = (array, string) => {
  const filtredArray = [];

  array.forEach(element => {
    if (element.title.toLowerCase().includes(string.toLowerCase().trim())) {
      filtredArray.push(element);
    }
  });
  
  return filtredArray;
}

export default filter;