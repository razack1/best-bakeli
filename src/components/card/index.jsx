import React from "react";
import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";
import './index.css'

export default function Cards() {
    return (
        <Card className="carde mx-2">
            <CardRow size="sm" className="card-row ">
                <CardStatus title="Complete" amount="35 Cours" />
            </CardRow>
        </Card>
    );
}