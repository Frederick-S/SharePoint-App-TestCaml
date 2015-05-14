<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <meta name="WebPartPageExpansion" content="full" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/spinner.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/alertify/alertify.core.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/alertify/alertify.default.css" />
    <link rel="Stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.7/css/jquery.dataTables.min.css" />
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Test Caml
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="setting">
        <div class="UserSectionHead">Web Url:</div>
        <div class="UserSectionBody">
            <div class="UserControlGroup">
                <input id="web-url" type="text" />
                <input id="fetch-lists" type="button" value="Get" />
            </div>
        </div>
        <div class="UserSectionHead">Available Lists:</div>
        <div class="UserSectionBody">
            <div class="UserControlGroup">
                <select id="available-lists"></select>
            </div>
        </div>
        <div class="UserSectionHead">Caml:</div>
        <div class="UserSectionBody">
            <div class="UserControlGroup">
                <textarea id="caml" rows="10" cols="20"></textarea>
                <input id="execute-query" type="button" value="Execute Query" />
            </div>
        </div>
    </div>
    <hr />
    <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
    </div>
    <div id="query-result"></div>
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.requestexecutor.js"></script>
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/alertify/alertify.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript">
        App.run();
    </script>
</asp:Content>
