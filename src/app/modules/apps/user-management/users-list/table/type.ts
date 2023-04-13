export interface IPageStack {
    offset: number
    id: string
}

export type IUserProps = {
    pushReference: (id: string, offset: number) => void;
};

export type IReferralProps = {
    pushReference: (id: string, offset: number) => void;
    pageStack: IPageStack[];
    popReference: () => void;
};