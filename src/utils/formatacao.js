import { parseISO } from "date-fns";

export default function Formatar(strData) {
  console.log(strData);

  const firstDate = parseISO(strData);
  console.log(firstDate);
  //const formattedDate = format(firstDate, "dd/MM/yyyy");

  return "";
}
