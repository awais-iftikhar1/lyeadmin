import { FILTER_ENUM } from "../../../../../utils/enum";

export const filterList = [
    {
        value: '',
        label: 'No Filter',
    },
    {
        value: FILTER_ENUM.ACTIVE,
        label: 'Active',
    },
    {
        value: FILTER_ENUM.INACTIVE,
        label: 'Inactive',
    },
    {
        value: FILTER_ENUM.BLOCKED,
        label: 'Blocked',
    },
];