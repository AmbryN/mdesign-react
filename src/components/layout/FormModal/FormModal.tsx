import { ReactNode } from "react";
import Button from "@components/Button/Button";

function FormModal({
  title,
  show,
  handleClose,
  handleSave,
  children,
}: {
  title: string;
  show: boolean;
  handleClose: any;
  handleSave: any;
  children: ReactNode;
}) {
  return (
    <div>
      <div onClick={handleClose}>
        <span>{title}</span>
      </div>
      <div>{children}</div>
      <div>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default FormModal;
