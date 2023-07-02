import Dropdown from "react-bootstrap/Dropdown";

function CustomDropdown({ text, menuItems = [], handleSelection }) {
  return (
    <Dropdown onSelect={handleSelection}>
      <Dropdown.Toggle id="dropdown-basic">{text}</Dropdown.Toggle>
      <Dropdown.Menu>
        {menuItems.map((item) => (
          <Dropdown.Item key={item} eventKey={item}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
