/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "HideMembersBadge",
    description: "Customize visibility of other member's badges",
    authors: [Devs.f3tch],
    patches: [
        // hide the new badges
        {
            find: "pendingBadgeDisplayOrder",
            replacement: {
                match: /\},\[\i,\i,\i,\i,\i,\i\]\);if\(0===(\i)\.length&&!(\i)\)return null;/,
                replace: "$&$1=$1.filter(e=>![\"streaming\",\"game_variety\",\"game_time\",\"account_age\"].includes(e.id));"
            }
        },
        // remove badge row overflow limit causing "+1/+2/+3" button to appear
        {
            find: "UserProfileBadgeListRows",
            replacement: {
                match: /let (\i)=(\i)&&!(\i),(\i)=\1\?Math\.max\((\i)\.length-\i\.\i,0\):0;return (\i)=\1\?\[\5\.slice\(0,\i\.\i\)\]/,
                replace: "let $1=$2&&!$3,$4=0;return $6=$1?[$5]"
            }
        }
    ]
});
