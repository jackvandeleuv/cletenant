import { getParcel } from "./fetchData.js";
import { renderCivilTicketsPage } from "./pages/civilTicketsPage.js";
import { renderParcelPage, setParcelPageParcelState } from "./pages/parcelPage.js";
import { renderSearchPage } from "./pages/searchPage.js";
import { renderViolationsPage } from "./pages/violationsPage.js";

renderSearchPage();


// TEST  ###################################################################

async function test() {
    const parcel = await getParcel("10134044");
    setParcelPageParcelState(parcel[0]);
    renderParcelPage();
    // renderViolationsPage();
    renderCivilTicketsPage();
}
test();