import React,{ useRef } from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

const inputs = [
    {
        id: "fName",label: "First Name"
    },{
        id: "lName",label: "Last Name"
    },{
        id: "gender",label: "Gender"
    },{
        id: "address",label: "Address"
    }
];

export default function App() {
    const myRefs = useRef([]);

    const handleKeyUp = (e,targetElem) => {
        if (e.key === "Enter" && targetElem) {
            targetElem.focus();
        }
    };

    return (
        <div>
            {inputs.map((ipt,i) => (
                <TextField
                    onKeyUp={(e) =>
                        handleKeyUp(e,myRefs.current[i === inputs.length - 1 ? 0 : i + 1])
                    }
                    inputRef={(el) => (myRefs.current[i] = el)}
                    id={ipt.id}
                    fullWidth
                    style={{ marginBottom: 20 }}
                    label={ipt.label}
                    variant="outlined"
                    key={ipt.id}
                />
            ))}
        </div>
    );
}