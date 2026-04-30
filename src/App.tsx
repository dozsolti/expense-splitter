import ExpensesSection from "./sections/ExpensesSection";
import PeopleSection from "./sections/PeopleSection";
import SummarySection from "./sections/SummarySection";
import useData from "./store";
import Header from "./ui/header";
import Pager from "./ui/pager";

function App() {
  const { people, expenses } = useData((state) => state);

  return (
    <>
      <Header />
      <Pager
        sectionNames={[`People`, `Expenses`, "Summary"]}
        sectionNameSuffixes={[`(${people.length})`, `(${expenses.length})`, ""]}
        sections={[<PeopleSection />, <ExpensesSection />, <SummarySection />]}
        actives={[true, people.length > 1, expenses.length > 0]}
      />
    </>
  );
}

export default App;
