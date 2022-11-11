const toDay = (index: any) => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hour = newDate.getHours();
  let mint = newDate.getMinutes();
  let sec = newDate.getSeconds();

  const myDateString = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    date < 10 ? `0${date}` : `${date}`
  } ${hour}:${mint}:${sec}`;

  return myDateString;
};

export { toDay };
