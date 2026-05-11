import { PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import useData, { addPerson, deletePerson } from "../store";
import Button from "../ui/button";
import Input from "../ui/input";

function PeopleSection() {
  const people = useData((state) => state.people);
  const [newName, setNewName] = useState("");

  const tryAddPerson = () => {
    if (newName.trim() === "") return;
    addPerson(newName);
    setNewName("");
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="Enter a name"
          className="flex-1 mb-4"
          value={newName}
          onChange={setNewName}
          onEnter={tryAddPerson}
        />
        <Button
          label=""
          after={<PlusIcon size={20} />}
          className="mb-4"
          variant="primary"
          onClick={tryAddPerson}
        />
      </div>

      <ul className="columns-2 lg:columns-3 list-inside list-none">
        {people.map((person) => (
          <li
            key={person.id}
            className="flex justify-between items-center bg-black/10 shadow mb-2 py-2 pr-1 pl-3 rounded-lg"
          >
            <span className="font-medium text-md">{person.name}</span>

            <Button
              label=""
              size="sm"
              before={<TrashIcon size={20} color="red" />}
              className="ml-4"
              variant="outline"
              onClick={() => deletePerson(person.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default PeopleSection;
