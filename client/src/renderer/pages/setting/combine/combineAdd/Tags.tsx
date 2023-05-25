import React from "react";

type TagsProps = {
//   setProgram: React.Dispatch<React.SetStateAction<string>>;
//   setStep: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  idx: string;
};

export default function Tags({ name, idx }: TagsProps) {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setProgram(e.target.value);
//   };

  return (
    <div className="custom-box">
        <div key={idx} style={{backgroundColor: "#DEEBFD", borderRadius: "4%"}}>{name}</div>
    </div>
  );
}
