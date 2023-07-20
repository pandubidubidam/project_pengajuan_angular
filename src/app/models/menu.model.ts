export interface Menu {
    menuCode: string;
    menuName: string;
    url: string;
    icon: string;
    details?: MenuDetails[];
    children?: Menu[];
  }
  
  interface MenuDetails {
    functionCode: string;
    functionMethod: string;
    functionName: string;
    functionPath: string;
    parentCode?: string;
  }
  