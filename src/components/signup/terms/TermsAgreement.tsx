import { useState } from "react";
import Title from "../../common/Title";
import Checkbox from "./Checkbox";

interface Props {
  handleLoginStep: (step: number) => void;
}
interface CheckboxType {
  id: string;
  text: string;
  checked: boolean;
}

const TermsAgreement: React.FC<Props> = ({ handleLoginStep }) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxType[]>([
    {
      id: "all",
      text: "다음 항목에 모두동의",
      checked: false,
    },
    {
      id: "service",
      text: "[필수] 서비스 이용약관",
      checked: false,
    },
    {
      id: "private",
      text: "[필수] 개인정보 수집 및 이용 동의",
      checked: false,
    },
    {
      id: "marketing",
      text: "[선택] 마케팅 정보 수신 동의",
      checked: false,
    },
  ]);

  const handleAllCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setCheckboxes((prev) => prev.map((checkbox) => ({ ...checkbox, checked })));
  };

  const handleCheckboxChange = (id: string) => {
    setCheckboxes((prev) => {
      const updatedCheckboxes = prev.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      );

      const allChecked = updatedCheckboxes
        .slice(1)
        .every((checkbox) => checkbox.checked);

      const anyUnchecked = updatedCheckboxes
        .slice(1)
        .some((checkbox) => !checkbox.checked);

      return updatedCheckboxes.map((checkbox, index) => {
        if (index === 0) {
          return { ...checkbox, checked: allChecked && !anyUnchecked };
        }
        return checkbox;
      });
    });
  };

  return (
    <>
      <div>
        <Title>서비스 이용약관에 동의해주세요</Title>

        <ul>
          <Checkbox
            id={checkboxes[0].id}
            checked={checkboxes[0].checked}
            onChange={handleAllCheckboxChange}
          >
            {checkboxes[0].text}
          </Checkbox>
          {checkboxes.slice(1).map((list) => (
            <Checkbox
              key={list.id}
              id={list.id}
              checked={list.checked}
              onChange={() => handleCheckboxChange(list.id)}
            >
              {list.text}
            </Checkbox>
          ))}
        </ul>
      </div>

      <button
        className="mt-auto"
        onClick={() => handleLoginStep(1)}
        disabled={!checkboxes[1].checked || !checkboxes[2].checked}
      >
        다음
      </button>
    </>
  );
};

export default TermsAgreement;