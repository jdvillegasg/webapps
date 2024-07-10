import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";

export function CreateNewUser() {
  const { addUser } = useUserActions();

  const [resultError, setResultError] = useState<"ok" | "ko" | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResultError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    if (!name || !email || !github) {
      return setResultError("ko");
    }

    addUser({ name, email, github });
    setResultError("ok");
    form.reset();
  };

  return (
    <Card style={{ marginTop: "16px" }}>
      <Title>Create new user</Title>
      <form className="" onSubmit={handleSubmit}>
        <TextInput placeholder="Username" name="name"></TextInput>
        <TextInput placeholder="User email" name="email"></TextInput>
        <TextInput placeholder="User github" name="github"></TextInput>
        <div>
          <Button type="submit" style={{ marginTop: "16px" }}>
            Create new user
          </Button>
          <span>
            {resultError === "ok" && <Badge>Saved correctly</Badge>}
            {resultError === "ko" && <Badge>Error in the form</Badge>}
          </span>
        </div>
      </form>
    </Card>
  );
}
