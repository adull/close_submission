import { memo, useCallback, useState, Fragment } from "react";
import { createRoot } from "react-dom/client";

const List = ({ items }) => {
  const [selected, setSelected] = useState([]);

  
const toggle = useCallback((name) => {
  setSelected((prev) => {
    if (prev.includes(name)) {
      return prev.filter((n) => n !== name);
    } else {
      return [...prev, name];
    }
  });
}, []);

  return (
  <Fragment>
    <div>
      <b>Selected:</b>{" "}
      {selected.length === 0
        ? " None"
        : selected.map((itemName) => itemName).join(", ")}
    </div>

    <ul className="List">
      {items.map((item, index) => (
        <ListItem key={index} name={item.name} color={item.color} selected={selected.includes(item.name)} onToggle={(name) => toggle(name)} />
      ))}
    </ul>
  </Fragment>
  );
}

const ListItem = memo(function ListItem({ name, color, selected, onToggle }) {
  const click = useCallback(() => onToggle(name), [onToggle, name]);
  return (
    <li key={name} className={`List__item List__item--${color} ${selected ? `List__item--selected` : ``}`} onClick={click}>
        {name}
    </li>
  )
})


// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

const root = createRoot(document.getElementById("root"));
root.render(<List items={items} />);