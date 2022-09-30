import React from "react";
import SideNav from "../../components/admin/Fund/sideNav";
import ReqFund from "../../components/admin/fundraiserRequestList";
import NavButton from "../../components/admin/orgrequestlist/NavButton";

export default function RequestedOrganizations (){

    return(
        <>
            <NavButton/>
            <SideNav/>
            <ReqFund/>
        </>
    )
}