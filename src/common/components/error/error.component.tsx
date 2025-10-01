import { Card } from "../card.component";
import { Title } from "../title.component";
import type { ErrorComponentProps } from "./error.types";

export function ErrorComponent({ message }: Readonly<ErrorComponentProps>) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card>
        <Title>Something went wrong</Title>
        <p className="text-center text-red-600">{message}</p>
      </Card>
    </div>
  );
}
