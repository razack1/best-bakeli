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
        <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden w-48">
            <div className="sm:flex sm:items-center w-32 h-28 mx-4 ">
            <img className="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4" alt=""/>
            <div className="text-center sm:text-left sm:flex-grow">
                <div className="mb-2">
                    <p className="text-xl leading-tight">Zaza</p>
                    <p className="text-sm leading-tight text-grey-dark">Developer at NothingWorks Inc.</p>
                </div>
                <div>
                    <button className="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Message</button>
                </div>
            </div>
            </div>
      </div>
    );
}