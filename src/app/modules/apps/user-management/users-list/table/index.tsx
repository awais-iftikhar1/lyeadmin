/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { ReferralSection } from "./ReferralSection";
import { IPageStack } from "./type";
import { UserSection } from "./userSection";

const UserManagement = () => {
  const [pageStack, setPageStack] = useState<IPageStack[]>([]);
  console.log("pageStack", pageStack);

  //push reference to pageStack
  const pushReference = (id: string, offset: number) => {
    setPageStack([...pageStack, { id, offset }]);
  };
  //Pop last reference from pageStack
  const popReference = () => {
    const newPageStack = [...pageStack];
    newPageStack.pop();
    setPageStack(newPageStack);
  };

  return (
    <>
      {pageStack.length > 0 ? (
        <ReferralSection
          pushReference={pushReference}
          pageStack={pageStack}
          popReference={popReference}
        />
      ) : (
        <UserSection pushReference={pushReference} />
      )}
    </>
  );
};

export { UserManagement };
