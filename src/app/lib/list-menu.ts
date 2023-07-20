export const ListMenu = {

    getListMenu(objectMenu: any) {

        let parentCodeHasParent: any[] = [];
        let menuCodeHasChild: any[] = [];
        let menuHasChildren: any[] = [];
        let menuHasParent: any[] = [];
        let menuCodeParent: any[] = [];
        let parentChild: any[] = [];
        let finalListMenu: any[] = [];

        // get menu has children
        objectMenu.forEach((element: any) => {
            menuCodeHasChild.push(element.menuCode);
            element.details.forEach((details: any) => {
                parentCodeHasParent.push(details.parentCode);
            });
        })

        menuHasChildren = objectMenu.filter((element: any) => {
            return parentCodeHasParent.some((f) => {
                return f === element.menuCode;
            })
        })

        // get menu has parent
        menuHasParent = objectMenu.filter((element: any) => {

            function getParentCodeChildMenu() {
                let parentCodeChild: any;
                element.details.forEach((elf: any) => {
                    parentCodeChild = elf.parentCode;
                });
                return parentCodeChild;
            }
            
            return menuCodeHasChild.some((f) => {
                return f === getParentCodeChildMenu();
            })
        })

        // insert child menu to parent
        menuHasChildren.forEach((element: any) => {
            
            menuCodeParent[0] = element.menuCode;
            function listChildren() {

               let listChildBaseOnParent = menuHasParent.filter((el: any) => {
                    function getParentCode() {
                        let parentCodeChild: any;
                        el.details.forEach((element: any) => {
                            parentCodeChild = element.parentCode;
                        });
                        return parentCodeChild;
                    }
                    return menuCodeParent.some((f) => {
                        return f === getParentCode();
                    })
                })
                return listChildBaseOnParent;
            }
            element.children = listChildren();
        });

        // merge parent and child menu
        menuHasChildren.forEach((element: any) => {
            parentChild.push(element);
        });
        menuHasParent.forEach(element => {
            parentChild.push(element);
        });

        // get menu code parent and child
        let menuCodeMergeParentChild: any[] = [];
        parentChild.forEach(element => {
            menuCodeMergeParentChild.push(element.menuCode);
        })

        // get menu has no children and parent
        for (let a = 0; a < menuCodeMergeParentChild.length; a++) {

            for(var b = 0; b < objectMenu.length; b++) {
                if(objectMenu[b].menuCode == menuCodeMergeParentChild[a]) {
                    objectMenu.splice(b, 1);
                    break;
                }
            }

        }

        // merging menu has no children & menu with children
        menuHasChildren.forEach((elf: any) => {
            objectMenu.push(elf);
        })

        finalListMenu = objectMenu;

        return finalListMenu;

    }
}