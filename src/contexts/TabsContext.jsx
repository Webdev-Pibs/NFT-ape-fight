import { createContext } from "react";
import { useContext } from 'react';
import { SelectionContext } from '@/contexts/SelectionContext';
import useTabs from "@/hooks/useTabs";

export const TabsContext = createContext(null);

export function TabsProvider({ children }) {
  const { lastTab, setLastTab, currentTab, setCurrentTab, updateTabs } = useTabs();
  const { fighters, selectedFighter, selectedItems } = useContext(SelectionContext);

  const nextStep = () => {
    console.log(currentTab)
    switch(currentTab){
      case 0:
        console.log(fighters[selectedFighter].dead)
        if(fighters[selectedFighter].dead) return false
        break;

      case 1:
        if(Object.keys(selectedItems).some(k => !selectedItems[k])) return false
        break;

      default:
        break;
    }

    console.log('ici')
    updateTabs(currentTab + 1)
  }

  const backStep = (i) => {
    updateTabs(i)
  }

  return (
    <TabsContext.Provider
      value={{ lastTab, setLastTab, currentTab, setCurrentTab, nextStep, backStep }}
    >
      {children}
    </TabsContext.Provider>
  );
}
