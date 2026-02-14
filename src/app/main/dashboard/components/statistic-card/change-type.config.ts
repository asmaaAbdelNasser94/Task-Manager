import { ChangeType } from "../../../../core/enums/dashboard.enum";

export const CHANGE_TYPE_CLASS: Record<ChangeType, string> = {
    [ChangeType.POSITIVE]: 'statistic-positive',
    [ChangeType.NEGATIVE]: 'statistic-negative',
    [ChangeType.NEUTRAL]: 'statistic-neutral',
}