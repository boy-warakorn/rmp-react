export const getHeaderTitle = () => {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/rooms": {
      return "Room Management";
    }
    case "/packages": {
      return "Residents’ packages";
    }
    case "/buildings": {
      return "Building Management";
    }
    case "/complaints": {
      return "Complaints";
    }
    case "/contacts": {
      return "Contact List";
    }
    case "/payments": {
      return "Bills and Payments";
    }
    case "/manage-accounts": {
      return "Manage Accounts";
    }
    case "/settings": {
      return "Room Management";
    }

    default:
      break;
  }
};
