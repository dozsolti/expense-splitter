import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";

import { setQueryParams } from "../utils/query";
import Button from "./button";

export default function Pager({
  sectionNames,
  sectionNameSuffixes,
  sections,
  actives,
}: {
  sectionNames: string[];
  sectionNameSuffixes: string[];
  sections: React.ReactNode[];
  actives: boolean[];
}) {
  const [currentPage, setCurrentPage] = React.useState(
    parseInt(new URL(window.location.href).searchParams.get("page") || "0"),
  );

  useEffect(() => {
    setQueryParams({
      page: currentPage.toString(),
    });
  }, [currentPage]);

  const isLastPage = currentPage === sections.length - 1;

  return (
    <div className="flex flex-col gap-1 mx-auto px-2 max-w-5xl container">
      <div className="flex gap-1">
        {sections
          .filter((_, i) => i < currentPage)
          .map((_, i) => (
            <div
              key={`prev-section-${i}`}
              className="bg-card shadow-sm px-3 py-1 border rounded-lg text-card-foreground"
            >
              <h2 className="font-bold text-lg">
                {sectionNames[i]} {sectionNameSuffixes[i]}
              </h2>
            </div>
          ))}
      </div>
      <div className="bg-card shadow-sm px-3 py-2 border rounded-lg text-card-foreground">
        <h2 className="mb-2 font-bold text-2xl text-center">
          {sectionNames[currentPage]} {sectionNameSuffixes[currentPage]}
        </h2>
        {sections[currentPage]}
      </div>

      {!isLastPage && <div className="max-md:h-24" />}
      <div
        className={`max-md:bottom-0 max-md:left-0 rounded-lg mb-2 bg-card flex px-4 py-2 border max-md:right-0 ${
          currentPage == 0 ? "justify-end" : "justify-between"
        } 
        ${!isLastPage ? "max-md:fixed max-md:m-2" : ""}
        `}
      >
        {currentPage > 0 && (
          <Button
            label={sectionNames[currentPage - 1]}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0 || !actives[currentPage - 1]}
            before={<ChevronLeft />}
          />
        )}
        {currentPage < sections.length - 1 && (
          <Button
            label={sectionNames[currentPage + 1]}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, sections.length - 1))
            }
            disabled={
              currentPage === sections.length - 1 || !actives[currentPage + 1]
            }
            after={<ChevronRight />}
          />
        )}
      </div>
    </div>
  );
}
