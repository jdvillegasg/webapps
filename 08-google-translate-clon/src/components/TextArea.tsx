import { Form } from "react-bootstrap";
import { SectionType } from "../constants";

interface Props {
  type: SectionType;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const commonStyles = { border: 0, height: "200px" };

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return "Enter text";
  if (loading) return "Loading...";
  return "Translated text";
};

export const TextArea: React.FC<Props> = ({
  type,
  loading,
  value,
  onChange,
}) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      disabled={type === SectionType.To}
      style={styles}
      value={value}
      onChange={handleChange}
    ></Form.Control>
  );
};
