export const getHeaderTitle = () => {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/rooms": {
      return "Room Management";
    }
    case "/packages": {
      return "Residents’ packages";
    }
    case "/reports": {
      return "Report and Complaints";
    }
    case "/contacts": {
      return "Contact List";
    }
    case "/payments": {
      return "Bills and Payments";
    }
    case "/manage-accounts": {
      return "Overall Users";
    }
    case "/settings": {
      return "Room Management";
    }

    default:
      break;
  }
};
