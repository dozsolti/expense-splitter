import { resetStore } from "../store";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3">
      <div className="font-light text-card-foreground text-xl">
        Expense Splitter
      </div>
      <a
        className="text-gray-500"
        onClick={() => {
          if (confirm("Clear all data?")) {
            resetStore();
            window.history.pushState(null, "", window.location.pathname);
            window.location.reload();
          }
        }}
      >
        Reset
      </a>
    </div>
  );
}
