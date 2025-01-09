import React, { useState } from "react";

export const UseForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm)
    

    const onInputChange = ({currentTarget}: React.FormEvent<HTMLInputElement>) => {

        const { name, value } = currentTarget

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };
};
