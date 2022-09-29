import React from "react";


interface Props {
    children?: React.ReactNode;
    onClick: () => void;
    isSubmit: boolean;
}

export const BaseButton: React.FC<Props> = ({
    children,
    onClick,
    isSubmit = true,

}) => {
    return (
        <button
            type={isSubmit ? 'submit' : 'button'}

            onClick={onClick}
        >
            {children}
        </button>
    )
}