/*!
 * rovalra v2.4.15.1
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });

  // src/content/core/settings/settingConfig.js
  var SETTINGS_CONFIG = {
    Marketplace: {
      title: "Marketplace",
      settings: {
        itemSalesEnabled: {
          label: "Item Sales",
          description: [
            "This shows the most up to date sales and revenue data we have.",
            "The sales data is very likely to be inaccurate on items that are for sale, but very likely to be correct on off-sale items."
          ],
          deprecated: "Sale stats are very old and now inaccurate.",
          type: "checkbox",
          default: !1
        },
        hiddenCatalogEnabled: {
          label: "Hidden Catalog",
          description: [
            "Shows Roblox made items before they are on the official marketplace."
          ],
          deprecated: "Patched by Roblox",
          locked: "This feature has been patched by Roblox and is no longer functional.",
          isPermanent: !0,
          type: "checkbox",
          default: !1
        },
        SaveLotsRobuxEnabled: {
          label: "Save 10%-40% Robux on Purchases",
          description: [
            "This adds a button allowing you to save 40% on items on the marketplace and 10% on gamepasses",
            "Keep in mind a group is required for this to work.",
            "**When buying something there will be a 'Save X Robux' Button which when pressed will set up the experience required for it to work for you, if not already set up.**"
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            RobuxPlaceId: {
              label: "Place ID to use for the 10%-40% Robux back",
              description: [
                "It is best to not modify this, as when using the feature it will automatically set a correct place id.",
                "**Don't change this unless you know what your doing**"
              ],
              type: "input",
              default: null,
              placeholder: "Enter Place ID here..."
            },
            configureGame: {
              label: "Configure Experience",
              description: "Open the setup to configure an experience for the 40% method without needing to be in a purchase flow.",
              type: "button",
              buttonText: "Open Setup",
              event: "rovalra:open40methodSetup"
            }
          }
        },
        EnableRobuxAfterPurchase: {
          label: "Robux After Purchase",
          description: "This feature restores the 'Your balance after this transaction will be X' text to the new Roblox purchase UI after it was removed.",
          type: "checkbox",
          default: !0
        },
        EnableItemDependencies: {
          label: "Item Dependencies",
          description: [
            "This feature shows an items dependencies which means you are able to view the texture, mesh and more of an item."
          ],
          type: "checkbox",
          default: !0
        },
        priceFloorEnabled: {
          label: "Show Price Floor",
          description: "This will show the price floor when viewing items, and shows if the item you are viewing is sold at or above the price floor.",
          type: "checkbox",
          default: !0
        },
        ParentItemsEnabled: {
          label: "Show what bundle an item is a part of.",
          description: "When viewing items pages of items inside of a bundle it will tell you what bundle that item is from.",
          type: "checkbox",
          default: !0
        },
        PreviousPriceEnabled: {
          label: "Previous Price to item cards and on item pages.",
          description: "This shows the price of an offsale item before it went offsale.",
          type: "checkbox",
          default: !0
        },
        itemTradingEnabled: {
          label: "Item Trading Info",
          description: [
            "Shows Rolimons values, demand, trend, rare, projected and more on item pages."
          ],
          type: "checkbox",
          default: !0
        }
      }
    },
    Games: {
      title: "Experiences",
      settings: {
        PreferredRegionEnabled: {
          label: "Preferred Region Play Button",
          description: [
            "This adds a play button that joins your preferred region.",
            "This also automatically serverhops",
            "If you have this enabled and Quick Play Button, there will be a Preferred Region quick play button "
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            robloxPreferredRegion: {
              label: "Preferred Region",
              description: [
                "Select your preferred region for joining experiences.",
                "**Automatic** will automatically attempt to find the closest region to you."
              ],
              type: "select",
              options: "REGIONS",
              showFlags: !0,
              default: "AUTO"
            }
          }
        },
        QuickPlayEnable: {
          label: "Quick Play Button",
          description: [
            "This will add a quick play button to experiences so you can quickly join the experience without opening the experience page.",
            "If you have Preferred Region Play Button enabled it will also add a Preferred Region quick play button to quickly join your preferred region.",
            "This is made to look like the official Roblox client's Quick Play button."
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            privateservers: {
              label: "Show Private Servers in Quick Play",
              description: [
                "This adds a button to quickly browse and join private servers to the quick play."
              ],
              type: "checkbox",
              default: !0
            },
            playbuttonpreferredregionenabled: {
              label: "Change the normal Play button to join your preferred region in Quick Play",
              description: [
                "This makes the Roblox Play button in the Quick Play join servers closest to you, instead of a random region."
              ],
              type: "checkbox",
              default: !0
            }
          }
        },
        whatamIJoiningEnabled: {
          label: "What Am I Joining",
          description: [
            "This shows the server ID, region, if it's a private server, and more info about the server you are joining when joining an experience."
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            AlwaysGetInfo: {
              label: "Always Get Server Info",
              description: [
                "This will always get the server info, even if no server data is available.",
                "It has a very small change to get inaccurate information."
              ],
              type: "checkbox",
              default: !0
            },
            closeUiByClickingTheBackground: {
              label: "Close the 'What am I joining' UI by clicking the background",
              description: "This allows you to click the background to close the UI, can be annoying if you want to see the info provided in the UI",
              type: "checkbox",
              default: !0
            }
          }
        },
        EnableGameTrailer: {
          label: "Experience Trailer",
          description: [
            "This adds experience trailers not on youtube to the website, replacing Roblox's way of doing it.",
            "And as a result adding more quality of life, like being able to full screen, turn off auto play, view the length of the video, change playback speed and picture in picture mode."
          ],
          type: "checkbox",
          default: !1,
          childSettings: {
            Enableautoplay: {
              label: "Auto Play Trailer",
              description: [
                "This will automatically play the trailer"
              ],
              type: "checkbox",
              default: !0
            }
          }
        },
        EnableDevProducts: {
          label: "View Developer Products",
          description: "This allows you to view the developer products of an experience directly on the store page.",
          type: "checkbox",
          default: !0
        },
        QuickOutfitsEnabled: {
          label: "Quick Equip Outfits",
          description: [
            "This allows you to quickly switch your avatar on the an experience page."
          ],
          type: "checkbox",
          default: !1
        },
        botdataEnabled: {
          label: "Bot Data",
          description: [
            "Shows if an experience has a lot of bots in the description of the experience.",
            "It doesn't show the amount of bots, since the sample size is too small to give an accurate number."
          ],
          type: "checkbox",
          default: !0
        },
        subplacesEnabled: {
          label: "Subplaces",
          description: [
            "This adds a tab to an experience page that shows the subplaces of the experience."
          ],
          type: "checkbox",
          default: !0
        },
        updateHistoryEnabled: {
          label: "Update History",
          description: [
            "This adds a tab to an experience page that has a heatmap showing the update history of an experience.",
            "This feature was heavily inspired by a RoPro v2 feature."
          ],
          type: "checkbox",
          default: !0,
          beta: "This feature is lacking update history data. It will slowly get it over time."
        },
        recentServersEnabled: {
          label: "Recent Servers",
          description: [
            "Shows the 4 most recent servers you joined under an experience."
          ],
          type: "checkbox",
          default: !0,
          storageKey: "rovalra_server_history"
        },
        TotalServersEnabled: {
          label: "Total Servers",
          description: [
            "This shows the total amount of servers RoValra is tracking under that experience."
          ],
          type: "checkbox",
          default: !0
        },
        GameVersionEnabled: {
          label: "Experience Version",
          description: [
            "This shows the current version an experience is on.",
            "Useful for developers."
          ],
          type: "checkbox",
          default: !0
        },
        OldestVersionEnabled: {
          label: "Oldest Server Version",
          description: [
            "This shows the oldest place version that servers are still running on.",
            "Useful for developers."
          ],
          type: "checkbox",
          default: !0
        },
        ServerFilterEnabled: {
          label: "Server Filters",
          description: [
            "This adds a filter to the server list.",
            "**It is highly recommended that the 'Server List Modifications' setting is enabled for this to work correctly.**"
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            RegionFiltersEnabled: {
              label: "Region Filters",
              description: "Adds Region filters in the server list.",
              type: "checkbox",
              default: !0
            },
            UptimeFiltersEnabled: {
              label: "Uptime Filters",
              description: "Adds Server Uptime filters in the server list.",
              type: "checkbox",
              default: !0
            },
            VersionFiltersEnabled: {
              label: "Place Version Filters",
              description: "Adds Place Version filters in the server list allowing you to filter by servers running a specific place version.",
              type: "checkbox",
              default: !0
            }
          }
        },
        ServerlistmodificationsEnabled: {
          label: "Server List Modifications",
          description: [
            "This adds multiple different features to the server list",
            "These modifications will also apply to the 'Servers My Friends Are In'"
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            enableShareLink: {
              label: "Share link button",
              description: [
                "This adds a share link button under the join button so you can send a link to the server for other people to join with.",
                "This uses fishstrap.app for the share link."
              ],
              type: "checkbox",
              default: !0
            },
            EnableServerUptime: {
              label: "Server Uptime",
              description: [
                "This shows an estimate of a servers uptime in the server list.",
                "This works by RoValra tracking hundreds of thousands of servers in a database and then estimating the uptime."
              ],
              type: "checkbox",
              default: !0
            },
            EnableServerRegion: {
              label: "Server Region",
              description: [
                "This shows the servers region / location"
              ],
              type: "checkbox",
              default: !0
            },
            EnablePlaceVersion: {
              label: "Server Version",
              description: [
                "This shows the version of the experience that a specific server is running."
              ],
              type: "checkbox",
              default: !0
            },
            EnableFullServerID: {
              label: "Show the entire ServerID",
              description: [
                "This shows the entire ServerID",
                "By default Roblox only shows a part of it.",
                "It will hide ServerIDs of servers that you are playing in or friends are playing in unless hovered over."
              ],
              type: "checkbox",
              default: !0
            },
            EnableFullServerIndicators: {
              label: "Full Server Indicators",
              description: [
                "This adds indicators when a server is full",
                "Like the queue size, and text telling you the server is full if we don't have region data."
              ],
              type: "checkbox",
              default: !0
            },
            EnableServerPerformance: {
              label: "Show Server Performance",
              description: [
                "This will show the performance of the server, useful if you wanna avoid servers that are running poorly."
              ],
              type: "checkbox",
              default: !0
            },
            EnableMiscIndicators: {
              label: "Show misc indicators",
              description: [
                "This shows indicators for servers you cannot join like if someone is playing in a private server"
              ],
              type: "checkbox",
              default: !0
            },
            EnableDatacenterandId: {
              label: "Show Datacenter ID and Server Ip",
              description: "This shows the Datacenter ID server Ip of servers in the server list.",
              type: "checkbox",
              default: !1
            }
          }
        },
        PrivateQuickLinkCopy: {
          label: "Quick Private Server Link Copy and Generation",
          description: [
            "This allows you to quickly copy a private server link or generate a new private server link"
          ],
          type: "checkbox",
          default: !0
        }
      }
    },
    Profile: {
      title: "Profile",
      settings: {
        userGamesEnabled: {
          label: "Hidden User Experiences",
          description: [
            "Shows a users hidden experiences on their profile."
          ],
          type: "checkbox",
          default: !0
        },
        userSniperEnabled: {
          label: "Instant Joiner",
          description: [
            "This joins a user instantly when they go into an experience, best used for people with a lot of people trying to join them.",
            "### Requirements",
            "- This feature requires the user to have their joins enabled for everyone or for you to be connected with them."
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            deeplinkEnabled: {
              label: "Join through deeplinks",
              description: [
                "This will use deeplinks to join the user for faster joining but may be less reliable."
              ],
              type: "checkbox",
              default: !1
            }
          }
        },
        profile3DRenderEnabled: {
          label: "Enable Custom 3D Profile Renderer",
          description: [
            "Replaces the default profile avatar with a more customizable and feature-rich 3D renderer.",
            "This feature is required for custom environments and other render-related settings.",
            "This feature was made possible cause of [RoAvatar](https://github.com/steinann/RoAvatar) \u2764\uFE0F"
          ],
          type: "checkbox",
          default: !1,
          experimental: "This feature may cause performance issues. And may be buggy",
          childSettings: {
            profileRenderUseApi: {
              label: "Use RoValra API for Environment",
              description: "Uses RoValra's API to save your environment choice instead of your 'About Me' section.",
              type: "checkbox",
              default: !0,
              donatorTier: 1,
              donatorReason: "Donator 1 is required since RoValra doesnt have the resources to track the 200k+ user settings."
            },
            profileRenderEnvironment: {
              label: "3D Profile Environment",
              description: [
                "Choose a custom environment for your own profile's 3D render.",
                "This only applies when viewing your own profile."
              ],
              type: "select",
              options: [
                { label: "None", value: "void", id: 1 },
                {
                  label: "Purple Space",
                  value: "purple",
                  environmentEndpoint: "/static/json/skyboxSpace.json",
                  id: 2
                },
                {
                  label: "Crossroads",
                  value: "crossroads",
                  environmentEndpoint: "/static/json/crossroads.json",
                  id: 3
                },
                {
                  label: "Baseplate",
                  value: "baseplate",
                  environmentEndpoint: "/static/json/baseplate.json",
                  id: 4
                }
              ],
              default: "void"
            },
            profileRenderRotateEnabled: {
              label: "Auto-Rotate Profile Avatar",
              description: [
                "Automatically rotates the 3D avatar on the profile page."
              ],
              type: "checkbox",
              default: !1
            }
          }
        },
        trustedConnectionsEnabled: {
          label: "Trusted Friends",
          description: [
            "This feature allows you to accept, request and remove trusted friends on the site for eligible friends.",
            "Eligible friends must be ID or face-scan verified and within your age bracket (13\u201317 or 18+).",
            "**Note:** Roblox uses an algorithm that may prevent adding someone even if they meet these requirements. [Learn more here.](https://en.help.roblox.com/hc/en-us/articles/46158344285204)"
          ],
          type: "checkbox",
          default: !0
        },
        friendsSinceEnabled: {
          label: "Friends Since",
          description: "This feature shows how long you have been friends with someone on your friends list.",
          type: "checkbox",
          default: !0
        },
        PrivateServerBulkEnabled: {
          label: "Private Server Bulk Removal",
          description: [
            "This will add a toggle to the private server inventory tab that allows you to easily set a bunch of private servers as inactive.",
            "This also works for setting inactive private servers as active"
          ],
          type: "checkbox",
          default: !0
        },
        idVerificationBadgeEnabled: {
          label: "ID Verification Badge",
          description: [
            "Shows if a user has verified their ID on their profile."
          ],
          type: "checkbox",
          default: !0
        },
        statusBubbleEnabled: {
          label: "Status Bubble",
          description: [
            "This allows you to set a status bubble on your profile that anyone with RoValra can see.",
            "Also allows you to view other RoValra users status bubbles.",
            'This works by adding a little "s:" string to your about me.'
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            statusBubbleUseApi: {
              label: "Use RoValra API for Status",
              description: "Uses RoValra's API to save your status instead of your 'About Me' section.",
              type: "checkbox",
              default: !0,
              donatorTier: 1,
              donatorReason: "Donator 1 is required since RoValra doesnt have the resources to track the 200k+ user settings."
            },
            statusBubbleHomePage: {
              label: "Status bubble for friends on home page, and other parts of the site where friends might show.",
              type: "checkbox",
              default: !0
            }
          }
        },
        donationbuttonEnable: {
          label: "Donation Button",
          description: [
            "This will add a donation button to a user's profile, which allows you to donate to someone via PLS Donate"
          ],
          type: "checkbox",
          default: !0
        },
        categorizeWearingEnabled: {
          label: "Improved Currently Wearing",
          description: [
            "Separates the 'Currently Wearing' section on profiles into categories like Items, Emotes, Body Parts and Animations.",
            "Also improves the item cards making them look a bit better and adds total outfit price.",
            "This feature was heavily inspired by a [roseal](https://www.roseal.live/) feature."
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            CategorizeBodyParts: {
              label: "Body Parts in its own category",
              description: "This puts Body Parts into its own category",
              type: "checkbox",
              default: !0
            },
            CategorizeEmotes: {
              label: "Emotes in its own category",
              description: "This puts Emotes into its own category",
              type: "checkbox",
              default: !0
            },
            CategorizeAnimations: {
              label: "Animations in its own category",
              description: "This puts Animations into its own category",
              type: "checkbox",
              default: !0
            }
          }
        },
        userRapEnabled: {
          label: "User RAP/Value",
          description: [
            "This shows a user's total RAP/Value on their profile."
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            HideSerial: {
              label: "Hide Serial Numbers",
              description: [
                "This hides serial numbers on limiteds unless you hover over them."
              ],
              type: "checkbox",
              default: !1
            }
          }
        },
        useroutfitsEnabled: {
          label: "User Outfits",
          description: [
            "This allows you to view a user's saved outfits on their profile."
          ],
          type: "checkbox",
          default: !0
        },
        RoValraBadgesEnable: {
          label: "RoValra Badges",
          description: [
            "Disabling this will hide any RoValra badges from profiles."
          ],
          type: "checkbox",
          default: !0
        }
      }
    },
    Communities: {
      title: "Communities",
      settings: {
        groupGamesEnabled: {
          label: "Hidden Community Experiences",
          description: ["Shows a communities hidden experiences."],
          type: "checkbox",
          default: !0
        },
        pendingRobuxEnabled: {
          label: "Unpending Robux",
          description: [
            "Shows an estimate of how many pending Robux will stop pending within 24 hours."
          ],
          experimental: "May be inaccurate. And will take ages depending on the amount of sales",
          type: "checkbox",
          default: !1
        },
        antibotsEnabled: {
          label: "Anti-Bot Members",
          description: [
            "This adds a button that will allow you to scan all members in a community for bots.",
            "If there is any bots it will allow you to quickly ban or kick them.",
            "This calculates bots by similar avatars and display names, so it may not be 100% accurate."
          ],
          experimental: "Takes ages since Roblox has heavy rate limits.",
          type: "checkbox",
          default: !0
        },
        QuickActionsEnabled: {
          label: "Quick Actions",
          description: [
            "This adds a quick action button allowing you to quickly ban or kick a bunch of users at once."
          ],
          type: "checkbox",
          default: !0
        },
        draggableGroupsEnabled: {
          label: "Draggable Communities",
          description: [
            "Hold and drag your communities to reorder them however you want.",
            "Your custom order will be saved and persist across page refreshes.",
            "Just hold down on a community for a moment and drag it up or down."
          ],
          type: "checkbox",
          default: !0,
          storageKey: "rovalra_groups_order"
        }
      }
    },
    Avatar: {
      title: "Avatar",
      settings: {
        forceR6Enabled: {
          label: "Remove R6 Warning",
          description: ["Removes the R6 warning when switching to R6"],
          type: "checkbox",
          default: !0
        },
        multiEquipEnabled: {
          label: "Multi-Equip",
          description: [
            "Allows you to equip multiple items like accessories seamlessly without having to use the advanced tab."
          ],
          type: "checkbox",
          default: !0
        },
        avatarFiltersEnabled: {
          label: "Avatar Filters",
          description: [
            "Adds filters to the avatar page, allowing you to filter by effect items, limited, offsale / onsale and more."
          ],
          type: "checkbox",
          default: !0
        },
        searchbarEnabled: {
          label: "Adds a Searchbar to the Avatar Page",
          description: [
            "Allowing you to quickly search for items in the avatar editor."
          ],
          type: "checkbox",
          default: !0
        },
        avatarRotatorEnabled: {
          label: "Avatar Rotator",
          description: [
            "Adds an avatar Rotator allowing you to Rotate between different avatars on a set interval.",
            "Allowing you to have a random avatar equipped every time you join an experience or respawn."
          ],
          type: "checkbox",
          default: !0,
          storageKey: [
            "rovalra_avatar_rotator_enabled",
            "rovalra_avatar_rotator_ids",
            "rovalra_avatar_rotator_interval"
          ]
        }
      }
    },
    transactions: {
      title: "Transactions",
      settings: {
        totalspentEnabled: {
          label: "Total Spent",
          description: [
            "This calculates the total amount of Robux and money you have spent on your account based on your transaction history."
          ],
          type: "checkbox",
          default: !0
        },
        totalearnedEnabled: {
          label: "Total Earned",
          description: [
            "This Calulates the amount of Robux you have earned through out the years via stuff like gamepasses, item sales etc."
          ],
          type: "checkbox",
          default: !0
        },
        pendingrobuxtrans: {
          label: "Unpending Robux Transactions",
          description: [
            "This estimates how many Robux will stop pending in 24 hours."
          ],
          experimental: "May be inaccurate. And will take ages depending on the amount of sales",
          type: "checkbox",
          default: !1
        }
      }
    },
    Trading: {
      title: "Trading",
      settings: {
        tradeValuesEnabled: {
          label: "Trade Values",
          description: [
            "This shows a bunch of useful information when trading, stuff like:",
            "Rolimons Values, Trade differences in values and rap, item demand, item trend and more."
          ],
          type: "checkbox",
          default: !0
        },
        tradePreviewEnabled: {
          label: "Trade Preview",
          description: [
            "Allows you to preview the value differences of a trade before opening it up.",
            'Also changes the timestamp for when the trade was sent to something more readable and adds a "open in Rolimons" beside a users username'
          ],
          type: "checkbox",
          default: !0
        },
        tradeFilterEnabled: {
          label: "Trade Filter",
          description: "Adds a search bar to the trade page. Allowing you to search for trades containing specific items.",
          type: "checkbox",
          default: !0
        },
        tradeSearchEnabled: {
          label: "Trade Search",
          description: "Allows you to search for items in the create trade pages to quickly find them.",
          type: "checkbox",
          default: !0
        },
        confirmTradeEnabled: {
          label: "Trade Protection",
          description: "This adds a small Preview of the trade you are doing in the accept / decline confirmation pop up.",
          type: "checkbox",
          default: !0
        },
        tradeProofEnabled: {
          label: "Proof Trades",
          description: "This allows you to quickly copy the rolimons proof format for any trade.",
          type: "checkbox",
          default: !1,
          experimental: "This may be inaccurate, and may in some cases have issues resulting in an inaccurate proof. Please verify it is correct before using."
        },
        tradeRiskEnabled: {
          label: "Show Item Risk",
          description: "Shows the calculated risk of an item based on its trading history on item pages and trade pages.",
          type: "checkbox",
          default: !1,
          experimental: "May be inaccurate. It is not recommended to fully rely on this."
        }
      }
    },
    Navigation: {
      title: "Navigation",
      settings: {
        qolTogglesEnabled: {
          label: "Adds quality of life toggles to the navigation bar",
          description: "Allowing you to quickly change your online status or experience status without going into settings.",
          type: "checkbox",
          default: !0
        },
        betaProgramsEnabled: {
          label: "Adds a beta programs toggle to the navigation bar",
          description: "This allows you to toggle beta programs you are enrolled into easily.",
          type: "checkbox",
          default: !1
        },
        quickSearchEnabled: {
          label: "Quick Search",
          description: "This adds an autocomplete to the search dropdown for users, friends and experiences",
          type: "checkbox",
          default: !0,
          childSettings: {
            userSearchEnabled: {
              label: "Quick User Search",
              description: "Shows a user that matched what you searched in the search dropdown.",
              type: "checkbox",
              default: !0
            },
            gameSearchEnabled: {
              label: "Quick Experience Search",
              description: "Shows an experience that has the best match to what you searched in the search dropdown.",
              type: "checkbox",
              default: !0
            },
            friendSearchEnabled: {
              label: "Quick Friend Search",
              description: "Shows a list of friends that has the best match to what you searched in the search dropdown.",
              type: "checkbox",
              default: !0
            }
          }
        },
        searchHistoryEnabled: {
          label: "Search History",
          description: "This tracks what you search on Roblox and allows you to view it.",
          type: "checkbox",
          default: !0,
          storageKey: "rovalra_search_history"
        },
        GroupFundsEnabled: {
          label: "Show Community Funds",
          description: "Shows the funds of a specific community when pressing your Robux amount in the navigation bar.",
          type: "checkbox",
          default: !1,
          storageKey: "rovalra-group-funds-data",
          childSettings: {
            GroupFundsIds: {
              label: "Community IDs",
              description: "The IDs of the communities to show funds for.",
              type: "list",
              default: [""],
              addButtonText: "Add Another Community",
              placeholder: "Enter Community ID..."
            }
          }
        }
      }
    },
    Miscellaneous: {
      title: "Miscellaneous",
      settings: {
        MemoryleakFixEnabled: {
          label: "Fix Roblox Memory Leak",
          description: [
            "This attempts to fix the memory leak caused by the Roblox website when reloading a page or navigating the site.",
            "This fix will redirect most url changes to 'about:blank' and then to the intended url, which fixes the memory leak, but may cause a slight flicker when navigating and issues with the back and forward arrows.",
            "If you don't know what a memory leak is or you don't feel like Roblox is using too much memory, you can leave this off.",
            "**This will prompt you to enable the 'webNavigation' permission for the feature to work.**"
          ],
          experimental: "May cause some issues.",
          type: "checkbox",
          default: !1,
          requiredPermissions: ["webNavigation"]
        },
        ServerdataEnabled: {
          label: "Send Server IDs and Place IDs to RoValra's API",
          description: [
            "This feature sends server IDs and place IDs to RoValra's API when you browse the site.",
            "This data is used for the server uptime and the Total Servers features.",
            "Leaving this feature on will help improve the Server Uptime and Total Servers features.",
            "**No personal data is sent, not even user ID or username\u2014only the server IDs and the place ID.**",
            "**No data that can be used to link the server IDs/place IDs to you are sent or logged.**"
          ],
          type: "checkbox",
          default: !0
        },
        DownloadCreateEnabled: {
          label: "Adds a download button to create.roblox.com",
          description: "This feature allows you to download assets like meshes, images, audios, etc from the create page.",
          type: "checkbox",
          default: !0
        },
        copyIdEnabled: {
          label: "Allows you to quickly copy an id of a thing you are right clicking.",
          description: "This adds a copy id button directly into the right click context menu so you don't have  to open the link and copy the id from the link.",
          type: "checkbox",
          default: !1,
          requiredPermissions: ["menus"]
        },
        copyUniverseIdEnabled: {
          label: "Allows you to quickly copy a universe id",
          description: "This adds a copy universe id button directly into the right click context menu.",
          type: "checkbox",
          default: !1,
          requiredPermissions: ["menus"]
        },
        cssfixesEnabled: {
          label: "Site Fixes",
          description: [
            "This fixes various site issues or just poor design choices by Roblox."
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            giantInvisibleLink: {
              label: "Fix the Continue and Favorites buttons' clickable area",
              description: [
                "Fixes the Continue and Favorites buttons on the home page being wider than shown visually."
              ],
              type: "checkbox",
              default: !0
            },
            gameTitleIssueEnable: {
              label: "Fix the experience title issues",
              description: "Fixes the top and bottom of experience titles on profiles getting cut off.",
              type: "checkbox",
              default: !0
            },
            FixCartRemoveButton: {
              label: "Fix Cart Remove Button Size",
              description: "Fixes the size of the remove item from cart button being super small in the shopping cart.",
              type: "checkbox",
              default: !0
            }
          }
        },
        eastereggslinksEnabled: {
          label: "Easter Egg Links",
          description: [
            "Adds Easter eggs to random links that otherwise would do nothing.",
            "Some easter eggs redirect offsite."
          ],
          type: "checkbox",
          default: !0
        },
        firstAccountEnabled: {
          label: "First Account?",
          description: "This adds a section in Roblox's settings showing if Roblox considers your Roblox account the first Roblox account you created.",
          type: "checkbox",
          default: !0,
          storageKey: "rovalra_first_account_cache"
        },
        revertLogo: {
          label: "Change the app launch icon",
          description: [
            "This changes the icon that shows when you join an experience.",
            "Old icon is the icon it had before they changed it to the new app client icon.",
            "And of course, a custom icon can be any image you want."
          ],
          type: "checkbox",
          default: !1,
          childSettings: {
            customLogoData: {
              label: "Custom icon",
              description: [
                "Upload your custom image. Maximum file size is 1MB."
              ],
              type: "file",
              default: null,
              compressSettingName: "compressCustomLogo",
              storageKey: "customLogoData"
            },
            compressCustomLogo: {
              label: "Compress Custom Icon",
              description: [
                "Compresses the image to reduce storage space (max 512px, JPEG 80% quality for photos, PNG for transparent images).",
                "Disable this to keep full quality and transparency, but it may use more storage space.",
                "Uncompressed images must still be under 1MB."
              ],
              type: "checkbox",
              default: !0
            }
          }
        }
      }
    },
    AntiAccountTracking: {
      title: "Privacy",
      settings: {
        streamermode: {
          label: "Streamer Mode",
          description: [
            "This feature hides information that you most likely don't wanna accidently show on something like a live stream."
          ],
          type: "checkbox",
          default: !1,
          experimental: "This may cause some issues since it tricks Roblox into thinking your private info is something it isn't.",
          childSettings: {
            settingsPageInfo: {
              label: "Hide Private Information on the settings page",
              description: [
                "This visually replaces your Email, Phone Number, Sessions and account location with 'RoValra Streamer Mode Enabled'",
                "And completely hides your Age Group, previous usernames in settings and Birthday."
              ],
              type: "checkbox",
              default: !0
            },
            hideRobux: {
              label: "Hide Robux",
              description: [
                "Simply hides your Robux by changing it to 'Hidden'",
                "This does not hide your Robux on purchase prompts."
              ],
              type: "checkbox",
              default: !1
            }
          }
        },
        spoofAsOffline: {
          label: "Spoof status as Offline",
          description: [
            "Makes you appear as offline to you and other people.",
            "This is useful if you want to appear offline while still allowing friends to join you in experiences, since the official offline status by Roblox does not allow this.",
            "Joining an experience will overwrite this status.",
            "This may take a few minutes to actually change your status to offline after turning on the feature."
          ],
          type: "checkbox",
          default: !1,
          exclusiveWith: ["spoofAsStudio", "spoofAsOnline"]
        },
        spoofAsStudio: {
          label: "Spoof status as In Studio",
          description: [
            "Makes your online status appear as 'In Studio' to you and other users.",
            "Joining an experience will overwrite this status.",
            "The Spoofed Status will only show if RoValra is enabled and a Roblox page is open."
          ],
          type: "checkbox",
          default: !1,
          exclusiveWith: ["spoofAsOffline", "spoofAsOnline"]
        }
      }
    },
    FunStuff: {
      title: "Fun Stuff",
      settings: {
        bandurationsEnabled: {
          label: "All possible ban durations",
          description: [
            "**This does not include voice chat bans.**",
            "**Any text saying 'Note:' is a note added by Valra to explain stuff better.**",
            "- Banned for 1 Day",
            "- Banned for 3 Days",
            "- Banned for 7 Days",
            "- Banned for 14 Days",
            "- Account Deleted",
            "\u2022 Warning",
            "\u2022 Banned for 6 Months",
            "\u2022 Banned for 1 Year",
            "\u2022 Note: the stuff below are not bans but instead Roblox telling you what will happen if you do it again, this doesn't always show when you get banned.",
            "\u2022 This stuff below is called a 'Forshadow ban'",
            "\u2022 If you violate the Community Standards again, your account may be suspended in the future. ",
            "\u2022 If you violate the Community Standards again, your account may be suspended for at least 1 day.",
            "\u2022 If you violate the Community Standards again, your account may be suspended for at least 3 days.",
            "\u2022 If you violate the Community Standards again, your account may be suspended for at least 7 days.",
            "\u2022 If you violate the Community Standards again, your account may be permanently banned from Roblox.",
            "- Note: 2 days, 1 hour, 3 hours, 6 hours and 12 hours bans might not be in use.",
            "\u2022 Banned for 2 Days",
            "\u2022 Banned for 3 Hours",
            "\u2022 Banned for 6 Hours",
            "\u2022 Banned for 12 Hours",
            "\u2022 Banned for 1 Hour",
            "\u2022 Account Terminated",
            "\u2022 Banned for 60 Days"
          ],
          default: null
        },
        BanReasons: {
          label: "All possible ban reasons on Roblox, some ban reasons have been censored by Valra.",
          description: [
            "**All ban reasons are 100% confirmed**",
            "**Keep in mind these are ban reasons, which is basically categories each ban might fall into.**",
            "**Any text saying 'Note:' is a note added by Valra to explain stuff better.**",
            "- None (Note: Likely used for when there isn't a ban reason, and instead only a moderator note.)",
            "- Profanity",
            "- Harassment",
            "- Spam",
            "- Advertisement",
            "\u2022 Scamming",
            "\u2022 Adult Content",
            "\u2022 Inappropriate",
            "\u2022 Privacy",
            "\u2022 Unclassified Mild",
            "\u2022 BlockedContent",
            "\u2022 Minor Swearing",
            "\u2022 Distorted Audio",
            "\u2022 Loud Earbleeders",
            "\u2022 Players Screaming into Microphone",
            "\u2022 Swearing",
            "\u2022 P####graphic Sounds",
            "\u2022 Explicit S##ual References and Innuendo",
            "\u2022 Dr## and Alc###l References",
            "\u2022 Discriminatory or N##i Content",
            "\u2022 Dating Imagery",
            "\u2022 Discriminatory Content",
            "\u2022 Dr##s, Alc###l",
            "\u2022 DMCA",
            "\u2022 Explicit N####y/P##n",
            "\u2022 Gang Images",
            "\u2022 N###s",
            "\u2022 Personal Attack/Harassment/Bullying",
            "\u2022 Red Armbands (Not N###s) ",
            "\u2022 Suggestive/S##ualized Imagery",
            "\u2022 S####de/Self-####",
            "\u2022 Clickbait Ads",
            "\u2022 Inappropriate Content",
            "\u2022 Not Related to Roblox",
            "\u2022 Off-Site Links",
            "\u2022 Hidden Message Clothing",
            "\u2022 None of the Above",
            "\u2022 Account Theft",
            "\u2022 Asset Ownership",
            "\u2022 Billing",
            "\u2022 Compromised Account",
            "\u2022 Copyright/DMCA",
            "\u2022 Derogatory/Harassment",
            "\u2022 Depressive",
            "\u2022 Discriminatory",
            "\u2022 Exploiting",
            "\u2022 Text Filter / Profanity",
            "\u2022 Gr###ing",
            "\u2022 Illicit Substance",
            "\u2022 Malicious",
            "\u2022 Misleading",
            "\u2022 Dating",
            "\u2022 Phishing/Scam",
            "\u2022 Real Info",
            "\u2022 RMT (Note: Real money transaction)",
            "\u2022 S##ual/Adult Content",
            "\u2022 Shock",
            "\u2022 Threats",
            "\u2022 Real-Life Tragedy",
            "\u2022 Politics",
            "\u2022 Encouraging Dangerous Behavior",
            "\u2022 Other",
            "\u2022 Dating and Romantic Content",
            "\u2022 S##ual Content",
            "\u2022 Directing Users Off-Platform",
            "\u2022 Privacy: Asking for PII",
            "\u2022 Privacy: Giving PII",
            "\u2022 Impersonation",
            "\u2022 Extortion and Blackmail",
            "\u2022 Illegal and Regulated Content",
            "\u2022 Misusing Roblox Systems",
            "\u2022 Political Content",
            "\u2022 T###orism/Extremism",
            "\u2022 Child Endangerment",
            "\u2022 Real-Life Threats",
            "\u2022 Cheat and Exploits",
            "\u2022 Seeking S##ual Content",
            "\u2022 Disruptive Audio",
            "\u2022 Contests and Sweepstakes",
            "\u2022 Threats or Abuse of Roblox Employees or Affiliates",
            "\u2022 Roblox Economy",
            "\u2022 IRL Dangerous Activities",
            "\u2022 Intellectual Property Violation",
            "\u2022 Off Platform Speech and Behavior",
            "\u2022 Violent Content and Gore",
            "\u2022 Advertising",
            "\u2022 Chargeback",
            "\u2022 DMCA Early Legal Strike",
            "\u2022 DMCA Final Legal Strike",
            "\u2022 You created or used an account to avoid an enforcement action taken against another account determined from your account information, such as your account email, phone number, or other information (Note: This is not a ban reason; this is a moderator note)",
            "\u2022 Trademark Violation",
            "\u2022 Roblox does not permit using third-parties to buy, sell, or trade Robux, promotional codes that falsely appear to be from Roblox Corporation, or inappropriate use of the community payout system. (Note: This is not a ban reason; this is a moderator note)",
            "- Note: Fun fact\u2014the 'using third-parties to buy, sell, or trade Robux' moderator notes are called 'Virtual Casino' bans in the code"
          ],
          default: null
        },
        appealstuff: {
          label: "Appeals related stuff",
          description: [
            "**Appeal Outcomes & Decisions**",
            "- Appeal denied",
            "- We have reviewed your appeal. This activity is still in violation of Roblox Community Standards.",
            "- Appeal accepted",
            "- We have reviewed your appeal. This activity is not in violation of Roblox Community Standards. Any consequence related to this activity is reversed.",
            "- We have reviewed your appeal. This activity is still in violation of Roblox Community Standards. However, we\u2019ve updated the violation category.",
            "**Appeal Instructions & Information**",
            "- Appeal something not shown",
            "- Request Appeal",
            "- Additional info (optional)",
            "- You can appeal by {date}",
            `- View past violations and manage your appeals. All content and behavior must adhere to the {link}Roblox Community
Standards{linkEnd}.`,
            "- Reviews are based on {link}Roblox Community Standards{linkEnd}",
            "- Learn more about appeals {link}here{linkEnd}.",
            "**Error Messages & Support Fallbacks**",
            "- Appeals information not found",
            "- If you would like to appeal something not shown here please visit {link}Support{linkEnd}",
            "- You've reached the maximum number of appeals. You may no longer appeal this {assetType}."
          ],
          default: null
        },
        captcha: {
          label: "All the places where you can get a captcha on Roblox",
          description: [
            "Roblox, I'm still mad that you denied my captcha bypass just to fix it a few weeks later \u{1F621}\u{1F621}\u{1F621}\u{1F621}\u{1F621}",
            "- sign up",
            "- login",
            "- change password",
            "- redeeming a gift card",
            "- submitting a support ticket",
            "- buying an item (speculation, might have been removed)",
            "- posting on a group wall (likely gonna be the same for group forum posts)",
            "- joining a group",
            "- 'generic challenge'\u2014no idea what they mean by that.",
            "- following a user",
            "- uploading 'clothing asset'\u2014could also be the same for any asset but I'm unsure",
            "- posting a comment on an asset (comments on assets have been removed)"
          ],
          default: null
        }
      }
    },
    Developer: {
      title: "Developer",
      settings: {
        info: {
          label: ["Developer Settings"],
          description: [
            "These are features used mostly to develop rovalra, if you don't know what your doing dont touch them."
          ],
          type: "yay"
        },
        alwaysShowDeveloperSettings: {
          label: ["Always show developer settings tab"],
          description: [
            "This will make the developer settings tab always show. So you dont have to do the easter egg every time."
          ],
          type: "checkbox",
          default: !1
        },
        EnableRobloxApiDocs: {
          label: "Roblox API docs",
          description: [
            "This adds documentation for Roblox apis on https://www.roblox.com/docs",
            "All the apis are captured when you browse the site.",
            "This stores all the APIs in storage."
          ],
          type: "checkbox",
          default: !1
        },
        EnablebannerTest: {
          label: ["Banner test"],
          description: ["This adds a test banner to experiences"],
          type: "checkbox",
          default: !1
        },
        impersonateRobloxStaffSetting: {
          label: ["Impersonate User Option On Profiles"],
          description: [
            "This enables the 'Impersonate User' option on peoples profile, used by Roblox internally.",
            "Pressing the 'Impersonate User' option does nothing other than error unless you are authorized to use it"
          ],
          deprecated: "Roblox removed it with the new profile overhaul",
          locked: "This internal Roblox feature was removed during the profile page redesign.",
          isPermanent: !0,
          type: "checkbox",
          default: !1
        },
        EarlyAccessProgram: {
          label: ["Early Access Program Showcase"],
          description: [
            "This will trick Roblox into thinking you are in an early access program, making Roblox add the early access program UI to your settings",
            "This setting wont allow you to join any early access programs you werent invited to.",
            "This will also overwrite any early access programs you might already be in."
          ],
          type: "checkbox",
          default: !1
        },
        EnableVideoTest: {
          label: ["Video test"],
          description: [
            "This adds a video test for experience trailers not uploaded to youtube on https://www.roblox.com/videotest",
            "Since this feature is only supported on the client."
          ],
          type: "checkbox",
          default: !1
        },
        onboardingShown: {
          label: ["Show onboarding"],
          description: [
            "This will show RoValra's onboarding screen again when this setting is disabled."
          ],
          type: "checkbox",
          default: !1
        },
        simulateRoValraServerErrors: {
          label: ["Simulate RoValra Server Errors / downtime"],
          description: [
            "This will simulate RoValra Server errors / downtime, useful when testing how the extension handles stuff like that."
          ],
          type: "checkbox",
          default: !1
        },
        forceReviewPopup: {
          label: ["Force Review Popup"],
          description: [
            "When enabled, shows the review popup every time it's triggered, ignoring all requirements. For testing purposes."
          ],
          type: "checkbox",
          default: !1
        },
        rendererDeveloperToggles: {
          label: "3D renderer Developer toggles",
          type: "checkbox",
          default: !1
        },
        profile3DRenderBypassCheck: {
          label: "Bypass Graphics Check",
          description: [
            "Bypasses the compatibility check for the 3D Profile Renderer.",
            "Only enable this if the 3D renderer was disabled due to graphics issues but you want to try anyway."
          ],
          type: "checkbox",
          default: !1
        },
        environmentTester: {
          label: "Environment Tester",
          description: [
            "Tool to test custom .glb environments for the profile renderer. Configure the settings and press 'Generate JSON' to get the configuration for an API."
          ],
          type: "checkbox",
          default: !1,
          childSettings: {
            // model settings
            modelUrl: {
              label: "GLB Model Path",
              description: [
                "Enter a local path (e.g., `assets/environments/model.glb`) or a full URL to a `.glb` model file."
              ],
              type: "input",
              default: "",
              placeholder: "Path or URL to .glb file...",
              storageKey: "envTester_modelUrl"
            },
            modelPosX: {
              label: "Model Pos X",
              type: "input",
              default: "0",
              placeholder: "e.g. 0"
            },
            modelPosY: {
              label: "Model Pos Y",
              type: "input",
              default: "0",
              placeholder: "e.g. 0"
            },
            modelPosZ: {
              label: "Model Pos Z",
              type: "input",
              default: "0",
              placeholder: "e.g. 0"
            },
            modelScaleX: {
              label: "Model Scale X",
              type: "input",
              default: "1",
              placeholder: "e.g. 1"
            },
            modelScaleY: {
              label: "Model Scale Y",
              type: "input",
              default: "1",
              placeholder: "e.g. 1"
            },
            modelScaleZ: {
              label: "Model Scale Z",
              type: "input",
              default: "1",
              placeholder: "e.g. 1"
            },
            modelCastShadow: {
              label: "Model Cast Shadow",
              type: "checkbox",
              default: !1
            },
            modelReceiveShadow: {
              label: "Model Receive Shadow",
              type: "checkbox",
              default: !0
            },
            // atmosphere settings
            bgColor: {
              label: "Background Color",
              type: "input",
              default: "",
              placeholder: "Hex color (e.g. #123456), empty for transparent"
            },
            showFloor: {
              label: "Show Floor",
              type: "checkbox",
              default: !1
            },
            // ambient light
            ambientLightToggle: {
              label: "Enable Ambient Light",
              type: "checkbox",
              default: !0
            },
            ambientLightColor: {
              label: "Ambient Light Color",
              type: "input",
              default: "#ffffff",
              placeholder: "Hex color"
            },
            ambientLightIntensity: {
              label: "Ambient Light Intensity",
              type: "input",
              default: "1.2",
              placeholder: "e.g. 1.2"
            },
            // directional light
            dirLightToggle: {
              label: "Enable Directional Light",
              type: "checkbox",
              default: !0
            },
            dirLightColor: {
              label: "Directional Light Color",
              type: "input",
              default: "#ffffff",
              placeholder: "Hex color"
            },
            dirLightIntensity: {
              label: "Directional Light Intensity",
              type: "input",
              default: "1.5",
              placeholder: "e.g. 1.5"
            },
            dirLightPosX: {
              label: "Dir Light Pos X",
              type: "input",
              default: "10",
              placeholder: "e.g. 10"
            },
            dirLightPosY: {
              label: "Dir Light Pos Y",
              type: "input",
              default: "20",
              placeholder: "e.g. 20"
            },
            dirLightPosZ: {
              label: "Dir Light Pos Z",
              type: "input",
              default: "10",
              placeholder: "e.g. 10"
            },
            dirLightCastShadow: {
              label: "Dir Light Cast Shadow",
              type: "checkbox",
              default: !0
            },
            // fog
            fogToggle: {
              label: "Enable Fog",
              type: "checkbox",
              default: !1
            },
            fogColor: {
              label: "Fog Color",
              type: "input",
              default: "#ffffff",
              placeholder: "Hex color"
            },
            fogNear: {
              label: "Fog Near",
              type: "input",
              default: "30",
              placeholder: "e.g. 30"
            },
            fogFar: {
              label: "Fog Far",
              type: "input",
              default: "120",
              placeholder: "e.g. 120"
            },
            cameraFar: {
              label: "Camera Far",
              description: [
                "Sets the far clipping plane of the camera for the renderer."
              ],
              type: "input",
              default: "100",
              placeholder: "e.g. 100"
            },
            // skybox settings
            skyboxToggle: {
              label: "Enable Skybox",
              type: "checkbox",
              default: !1
            },
            skyboxPx: {
              label: "Skybox Rt (Right)",
              type: "input",
              default: "https://www.rovalra.com/static/img/",
              placeholder: "URL to image"
            },
            skyboxNx: {
              label: "Skybox Lf (Left)",
              type: "input",
              default: "https://www.rovalra.com/static/img/",
              placeholder: "URL to image"
            },
            skyboxNy: {
              label: "Skybox Dn (Down)",
              type: "input",
              default: "https://www.rovalra.com/static/img/",
              placeholder: "URL to image"
            },
            skyboxPy: {
              label: "Skybox Up (Top)",
              type: "input",
              default: "https://www.rovalra.com/static/img/",
              placeholder: "URL to image"
            },
            skyboxPz: {
              label: "Skybox Ft (Front)",
              type: "input",
              default: "https://www.rovalra.com/static/img/",
              placeholder: "URL to image"
            },
            skyboxNz: {
              label: "Skybox Bk (Back)",
              type: "input",
              default: "https://www.rovalra.com/static/img/",
              placeholder: "URL to image"
            },
            // tooltip settings
            tooltipToggle: {
              label: "Enable Tooltip",
              type: "checkbox",
              default: !1
            },
            tooltipText: {
              label: "Tooltip Text",
              type: "input",
              default: "Environment by...",
              placeholder: "Enter tooltip text"
            },
            tooltipLink: {
              label: "Tooltip Link",
              type: "input",
              default: "",
              placeholder: "Enter URL"
            },
            importEnvironmentConfig: {
              label: "Import Environment Config",
              description: [
                "Import a JSON file with environment settings. This will overwrite the current values in the tester."
              ],
              type: "button",
              buttonText: "Import from JSON",
              event: "rovalra:importEnvironmentJson"
            },
            // generate button
            generateJson: {
              label: "Generate and Print JSON",
              description: "Generates the JSON config based on the settings above and prints it to the console.",
              type: "button",
              buttonText: "Generate JSON",
              event: "rovalra:generateEnvironmentJson"
            }
          }
        }
      }
    }
  };

  // src/background/background.js
  var state = {
    isMemoryFixEnabled: !1,
    programmaticallyNavigatedUrls: /* @__PURE__ */ new Set(),
    currentUserId: null,
    latestPresence: null,
    pollingInterval: null,
    csrfTokenCache: null,
    rotatorInterval: null,
    rotatorIndex: 0
  };
  function getDefaultSettings() {
    let defaults = {};
    for (let category of Object.values(SETTINGS_CONFIG))
      for (let [settingName, settingDef] of Object.entries(
        category.settings
      ))
        if (settingDef.default !== void 0 && (defaults[settingName] = settingDef.default), settingDef.childSettings)
          for (let [childName, childSettingDef] of Object.entries(
            settingDef.childSettings
          ))
            childSettingDef.default !== void 0 && (defaults[childName] = childSettingDef.default);
    return defaults;
  }
  __name(getDefaultSettings, "getDefaultSettings");
  function initializeSettings(reason) {
    let defaults = getDefaultSettings();
    chrome.storage.local.get(null, (currentSettings) => {
      let settingsToUpdate = {}, needsUpdate = !1;
      for (let [key, defaultValue] of Object.entries(defaults)) {
        let storedValue = currentSettings[key];
        if (storedValue === void 0)
          settingsToUpdate[key] = defaultValue, needsUpdate = !0;
        else if (defaultValue !== null) {
          let defaultType = typeof defaultValue, storedType = typeof storedValue;
          storedValue === null ? (console.warn(
            `RoValra: Setting '${key}' was null but expected ${defaultType}. Resetting.`
          ), settingsToUpdate[key] = defaultValue, needsUpdate = !0) : storedType !== defaultType && (console.warn(
            `RoValra: Type mismatch for '${key}'. Expected ${defaultType}, got ${storedType}. Resetting.`
          ), settingsToUpdate[key] = defaultValue, needsUpdate = !0);
        }
      }
      needsUpdate && chrome.storage.local.set(settingsToUpdate, () => {
        chrome.runtime.lastError ? console.error(
          "RoValra: Failed to sync settings.",
          chrome.runtime.lastError
        ) : console.log(
          `RoValra: Synced/Fixed ${Object.keys(settingsToUpdate).length} settings (Trigger: ${reason}).`
        );
      });
    });
  }
  __name(initializeSettings, "initializeSettings");
  function updateUserAgentRule() {
    let originalUA = self.navigator.userAgent, browser = "Unknown", engine = "Unknown";
    originalUA.includes("Firefox/") ? (browser = "Firefox", engine = "Gecko") : originalUA.includes("Edg/") ? (browser = "Edge", engine = "Chromium") : originalUA.includes("OPR/") || originalUA.includes("Opera/") ? (browser = "Opera", engine = "Chromium") : originalUA.includes("Chrome/") ? (browser = "Chrome", engine = "Chromium") : originalUA.includes("Safari/") && (browser = "Safari", engine = "WebKit");
    let manifest = chrome.runtime.getManifest(), version = manifest.version || "Unknown", environment = !("update_url" in manifest) ? "Development" : "Production", rovalraSuffix = `RoValraExtension(RoValra/${browser}/${engine}/${version}/${environment})`;
    (engine === "Gecko" || engine === "WebKit") && (rovalraSuffix += " UnofficialRoValraVersion");
    let rules = [
      {
        id: 999,
        priority: 5,
        action: {
          type: "modifyHeaders",
          requestHeaders: [
            {
              header: "User-Agent",
              operation: "set",
              value: `${originalUA} ${rovalraSuffix}`
            }
          ]
        },
        condition: {
          regexFilter: ".*_RoValraRequest=",
          resourceTypes: ["xmlhttprequest"]
        }
      },
      {
        id: 1e3,
        priority: 10,
        action: {
          type: "modifyHeaders",
          requestHeaders: [
            {
              header: "User-Agent",
              operation: "set",
              value: `Roblox/WinInet ${rovalraSuffix}`
            }
          ]
        },
        condition: {
          regexFilter: "^https://gamejoin\\.roblox\\.com/.*_RoValraRequest=|^https://apis\\.roblox\\.com/player-hydration-service/v1/players/signed",
          resourceTypes: ["xmlhttprequest"]
        }
      }
    ];
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [999, 1e3],
      addRules: rules
    });
  }
  __name(updateUserAgentRule, "updateUserAgentRule");
  var handleMemoryLeakNavigation = /* @__PURE__ */ __name((details) => {
    if (state.programmaticallyNavigatedUrls.has(details.url)) {
      state.programmaticallyNavigatedUrls.delete(details.url);
      return;
    }
    if (details.frameId !== 0 || details.transitionType === "auto_subframe" || details.transitionType === "reload" || details.url.includes("/download/client"))
      return;
    let newUrl = details.url, tabId = details.tabId;
    state.programmaticallyNavigatedUrls.add(newUrl), chrome.tabs.update(tabId, { url: "about:blank" }, () => {
      setTimeout(() => {
        chrome.tabs.update(tabId, { url: newUrl });
      }, 50);
    });
  }, "handleMemoryLeakNavigation"), navigationListener = /* @__PURE__ */ __name((details) => {
    state.isMemoryFixEnabled && handleMemoryLeakNavigation(details);
  }, "navigationListener");
  async function setupNavigationListener() {
    await chrome.permissions.contains({
      permissions: ["webNavigation"]
    }) && !chrome.webNavigation.onBeforeNavigate.hasListener(navigationListener) && chrome.webNavigation.onBeforeNavigate.addListener(navigationListener, {
      url: [{ hostContains: ".roblox.com" }],
      urlExcludes: ["roblox-player:*"]
    });
  }
  __name(setupNavigationListener, "setupNavigationListener");
  var contextMenuClickListener = /* @__PURE__ */ __name(async (info, tab) => {
    if (info.menuItemId.startsWith("rovalra-copy-universe-")) {
      let placeId = info.menuItemId.replace("rovalra-copy-universe-", ""), universeId = await getUniverseIdFromPlaceId(placeId);
      universeId && tab?.id && chrome.tabs.sendMessage(tab.id, {
        action: "copyToClipboard",
        text: String(universeId)
      });
    } else if (info.menuItemId.startsWith("rovalra-copy-") && tab?.id) {
      let textToCopy = info.menuItemId.replace("rovalra-copy-", "");
      chrome.tabs.sendMessage(tab.id, {
        action: "copyToClipboard",
        text: textToCopy
      });
    }
  }, "contextMenuClickListener");
  async function setupContextMenuListener() {
    await chrome.permissions.contains({
      permissions: ["menus"]
    }) && chrome.menus && !chrome.menus.onClicked.hasListener(contextMenuClickListener) && chrome.menus.onClicked.addListener(contextMenuClickListener);
  }
  __name(setupContextMenuListener, "setupContextMenuListener");
  async function getUniverseIdFromPlaceId(placeId) {
    try {
      let response = await callRobloxApiBackground({
        subdomain: "apis",
        endpoint: `/universes/v1/places/${placeId}/universe`
      });
      return response.ok ? (await response.json()).universeId : null;
    } catch (e) {
      return console.error("RoValra: Error fetching universe ID from place ID", e), null;
    }
  }
  __name(getUniverseIdFromPlaceId, "getUniverseIdFromPlaceId");
  async function callRobloxApiBackground(options) {
    let {
      subdomain = "api",
      endpoint = "",
      method = "GET",
      body = null,
      headers = {},
      fullUrl = null,
      isRovalraApi = !1,
      credentials,
      noCache = !1
    } = options, baseUrl = isRovalraApi ? subdomain === "www" ? "https://www.rovalra.com" : `https://${subdomain}.rovalra.com` : `https://${subdomain}.roblox.com`, url = fullUrl || `${baseUrl}${endpoint}`;
    let isStaticBinaryRequest = !1;
    try {
      isStaticBinaryRequest = /\.(?:glb|gltf|bin|png|jpe?g|webp|gif|bmp|svg|ktx2?|hdr|mp3|ogg|wav)(?:$|[?#])/i.test(new URL(url).pathname);
    } catch {
    }
    let shouldAppendMarker = !url.includes("_RoValraRequest=") && !endpoint.includes("/player-hydration-service/v1/players/signed") && !isStaticBinaryRequest;
    shouldAppendMarker && (url += `${url.includes("?") ? "&" : "?"}_RoValraRequest=`);
    let fetchHeaders = new Headers(headers || {});
    fetchHeaders.has("Accept") || fetchHeaders.set("Accept", isStaticBinaryRequest ? "*/*" : "application/json");
    let serializedHeaders = {};
    fetchHeaders.forEach((val, key) => serializedHeaders[key] = val);
    let fetchOptions = {
      method,
      headers: serializedHeaders,
      credentials: credentials ?? (isRovalraApi ? "omit" : "include")
    };
    noCache && (fetchOptions.cache = "no-store");
    if (body != null && method !== "GET" && method !== "HEAD")
      if (typeof FormData < "u" && body instanceof FormData)
        fetchOptions.body = body;
      else if (typeof body == "object")
        fetchOptions.headers["Content-Type"] || (fetchOptions.headers["Content-Type"] = "application/json"), fetchOptions.body = JSON.stringify(body);
      else
        fetchOptions.body = body;
    !isRovalraApi && method !== "GET" && method !== "HEAD" && state.csrfTokenCache && (fetchOptions.headers["X-CSRF-TOKEN"] = state.csrfTokenCache);
    let response = await fetch(url, fetchOptions);
    if (!isRovalraApi && response.status === 403 && method !== "GET" && method !== "HEAD") {
      let newCsrf = response.headers.get("x-csrf-token");
      newCsrf && (state.csrfTokenCache = newCsrf, fetchOptions.headers["X-CSRF-TOKEN"] = newCsrf, response = await fetch(url, fetchOptions));
    }
    return response;
  }
  __name(callRobloxApiBackground, "callRobloxApiBackground");
  function arrayBufferToBase64(buffer) {
    let bytes = new Uint8Array(buffer), chunkSize = 32768, binary = "";
    for (let i = 0; i < bytes.length; i += chunkSize) {
      let chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    return btoa(binary);
  }
  __name(arrayBufferToBase64, "arrayBufferToBase64");
  async function wearOutfit(outfitData) {
    let callWithRetry = /* @__PURE__ */ __name(async (options) => {
      let response;
      for (let i = 0; i < 4; i++) {
        if (response = await callRobloxApiBackground(options), response.ok) return response;
        if (response.status === 429 || response.status >= 500) {
          i < 3 && await new Promise((r) => setTimeout(r, 1e3));
          continue;
        }
        return response;
      }
      return response;
    }, "callWithRetry");
    try {
      let outfitId = typeof outfitData == "object" && outfitData !== null ? outfitData.itemId : outfitData;
      if (!outfitId)
        return console.error(
          "RoValra: wearOutfit called with invalid outfitData",
          outfitData
        ), { ok: !1 };
      let detailsRes = await callWithRetry({
        subdomain: "avatar",
        endpoint: `/v1/outfits/${outfitId}/details`
      });
      if (!detailsRes?.ok) return { ok: !1 };
      let details = await detailsRes.json(), promises = [];
      return details.assets && promises.push(
        callWithRetry({
          subdomain: "avatar",
          endpoint: "/v2/avatar/set-wearing-assets",
          method: "POST",
          body: { assets: details.assets }
        })
      ), details.playerAvatarType && promises.push(
        callWithRetry({
          subdomain: "avatar",
          endpoint: "/v1/avatar/set-player-avatar-type",
          method: "POST",
          body: { playerAvatarType: details.playerAvatarType }
        })
      ), details.scale && promises.push(
        callWithRetry({
          subdomain: "avatar",
          endpoint: "/v1/avatar/set-scales",
          method: "POST",
          body: details.scale
        })
      ), typeof outfitData == "object" && outfitData?.outfitDetail?.bodyColor3s ? promises.push(
        callWithRetry({
          subdomain: "avatar",
          endpoint: "/v3/avatar/set-body-colors",
          method: "POST",
          body: outfitData.outfitDetail.bodyColor3s
        })
      ) : details.bodyColors && promises.push(
        callWithRetry({
          subdomain: "avatar",
          endpoint: "/v1/avatar/set-body-colors",
          method: "POST",
          body: details.bodyColors
        })
      ), { ok: (await Promise.all(promises)).every((r) => r && r.ok) };
    } catch (e) {
      return console.error("RoValra: Error wearing outfit", e), { ok: !1 };
    }
  }
  __name(wearOutfit, "wearOutfit");
  function handlePresenceUpdate(presence) {
    if (JSON.stringify(presence) !== JSON.stringify(state.latestPresence)) {
      let oldPresence = state.latestPresence;
      state.latestPresence = presence, chrome.tabs.query({ url: "*://*.roblox.com/*" }, (tabs) => {
        tabs.forEach(
          (tab) => chrome.tabs.sendMessage(tab.id, {
            action: "presenceUpdate",
            presence: state.latestPresence
          }).catch(() => {
          })
        );
      });
      let isJoiningGame = /* @__PURE__ */ __name((p) => p && (p.userPresenceType === 2 || p.userPresenceType === 4), "isJoiningGame");
      isJoiningGame(presence) && presence.gameId && presence.rootPlaceId && (!isJoiningGame(oldPresence) || oldPresence.gameId !== presence.gameId) && chrome.storage.local.get(
        { rovalra_server_history: {} },
        (res) => {
          let history = res.rovalra_server_history || {}, gameId = presence.rootPlaceId.toString(), gameHistory = history[gameId] || [], now = Date.now();
          gameHistory = gameHistory.filter(
            (entry) => now - entry.timestamp < 1440 * 60 * 1e3
          );
          let serverIndex = gameHistory.findIndex(
            (entry) => entry.presence.gameId === presence.gameId
          );
          serverIndex > -1 && gameHistory.splice(serverIndex, 1), gameHistory.unshift({ presence, timestamp: now }), history[gameId] = gameHistory.slice(0, 4), chrome.storage.local.set({
            rovalra_server_history: history
          });
        }
      );
    }
  }
  __name(handlePresenceUpdate, "handlePresenceUpdate");
  function pollUserPresence() {
    state.currentUserId && chrome.storage.local.get(
      { recentServersEnabled: !0 },
      async (settings) => {
        if (settings.recentServersEnabled)
          try {
            let response = await callRobloxApiBackground({
              subdomain: "presence",
              endpoint: "/v1/presence/users",
              method: "POST",
              body: { userIds: [parseInt(state.currentUserId, 10)] }
            });
            if (response.ok) {
              let presence = (await response.json())?.userPresences?.[0];
              presence && handlePresenceUpdate(presence);
            }
          } catch {
          }
      }
    );
  }
  __name(pollUserPresence, "pollUserPresence");
  function updateAvatarRotator() {
    chrome.storage.local.get(
      [
        "rovalra_avatar_rotator_enabled",
        "rovalra_avatar_rotator_ids",
        "rovalra_avatar_rotator_interval"
      ],
      (data) => {
        if (state.rotatorInterval && (clearInterval(state.rotatorInterval), state.rotatorInterval = null), data.rovalra_avatar_rotator_enabled && data.rovalra_avatar_rotator_ids?.length > 0) {
          let ids = data.rovalra_avatar_rotator_ids;
          state.rotatorIndex = 0;
          let intervalSeconds = Math.max(
            parseInt(data.rovalra_avatar_rotator_interval, 10) || 5,
            5
          ), rotate = /* @__PURE__ */ __name(() => {
            if (ids.length === 0) return;
            let outfit = ids[state.rotatorIndex];
            wearOutfit(outfit), state.rotatorIndex = (state.rotatorIndex + 1) % ids.length;
          }, "rotate");
          rotate(), state.rotatorInterval = setInterval(
            rotate,
            intervalSeconds * 1e3
          );
        }
      }
    );
  }
  __name(updateAvatarRotator, "updateAvatarRotator");
  chrome.runtime.onInstalled.addListener((details) => {
    initializeSettings(details.reason), setupContextMenuListener();
  });
  chrome.runtime.onStartup.addListener(() => {
    initializeSettings("startup"), setupContextMenuListener();
  });
  chrome.storage.onChanged.addListener((changes, namespace) => {
    namespace === "local" && (changes.MemoryleakFixEnabled && (state.isMemoryFixEnabled = changes.MemoryleakFixEnabled.newValue, state.isMemoryFixEnabled && setupNavigationListener()), (changes.rovalra_avatar_rotator_enabled || changes.rovalra_avatar_rotator_ids || changes.rovalra_avatar_rotator_interval) && updateAvatarRotator());
  });
  chrome.permissions.onAdded.addListener((permissions) => {
    permissions.permissions?.includes("webNavigation") && setupNavigationListener(), permissions.permissions?.includes("menus") && setupContextMenuListener(), chrome.tabs.query({}, (tabs) => {
      tabs.forEach(
        (tab) => chrome.tabs.sendMessage(tab.id, { action: "permissionsUpdated" }).catch(() => {
        })
      );
    });
  });
  chrome.permissions.onRemoved.addListener((permissions) => {
    permissions.permissions?.includes("webNavigation") && chrome.webNavigation.onBeforeNavigate.hasListener(navigationListener) && chrome.webNavigation.onBeforeNavigate.removeListener(
      navigationListener
    ), permissions.permissions?.includes("menus") && chrome.menus?.onClicked.hasListener(contextMenuClickListener) && chrome.menus.onClicked.removeListener(contextMenuClickListener), chrome.tabs.query({}, (tabs) => {
      tabs.forEach(
        (tab) => chrome.tabs.sendMessage(tab.id, { action: "permissionsUpdated" }).catch(() => {
        })
      );
    });
  });
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case "updateOfflineRule":
        return chrome.declarativeNetRequest.updateEnabledRulesets(
          request.enabled ? { enableRulesetIds: ["ruleset_status"] } : { disableRulesetIds: ["ruleset_status"] }
        ), sendResponse({ success: !0 }), !1;
      case "updateEarlyAccessRule":
        return chrome.declarativeNetRequest.updateEnabledRulesets(
          request.enabled ? { enableRulesetIds: ["ruleset_3"] } : { disableRulesetIds: ["ruleset_3"] }
        ), sendResponse({ success: !0 }), !1;
      case "enableServerJoinHeaders":
        return chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ["ruleset_2"]
        }), !1;
      case "disableServerJoinHeaders":
        return chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: ["ruleset_2"]
        }), !1;
      case "injectScript":
        return chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          world: "MAIN",
          func: /* @__PURE__ */ __name((code) => {
            try {
              let script = document.createElement("script");
              script.textContent = code, document.documentElement.appendChild(script), script.remove();
            } catch {
            }
          }, "func"),
          args: [request.codeToInject]
        }).then(() => sendResponse({ success: !0 })).catch(
          (err) => sendResponse({ success: !1, error: err.message })
        ), !0;
      case "toggleMemoryLeakFix":
        return state.isMemoryFixEnabled = request.enabled, sendResponse({ success: !0 }), !1;
      case "injectMainWorldScript":
        return sender.tab?.id && chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          files: [request.path],
          world: "MAIN"
        }), sendResponse({ success: !0 }), !1;
      case "checkPermission":
        return chrome.permissions.contains(
          { permissions: [].concat(request.permission) },
          (granted) => {
            sendResponse({ granted });
          }
        ), !0;
      case "requestPermission":
        return [].concat(request.permission).includes("menus") ? (sendResponse({ granted: !0 }), !1) : ((async () => {
          let permission = [].concat(request.permission), requestId = "perm_" + Date.now() + "_" + Math.random().toString(36).slice(2), pageUrl = chrome.runtime.getURL(
            "public/Assets/permission_request.html?permission=" + encodeURIComponent(permission[0]) + "&requestId=" + encodeURIComponent(requestId)
          ), resultPromise = new Promise((resolve) => {
            function resultListener(msg, _sender, respond) {
              if (msg.action === "permissionRequestResult" && msg.requestId === requestId)
                return chrome.runtime.onMessage.removeListener(resultListener), resolve(!!msg.granted), typeof respond == "function" && respond({}), !0;
            }
            __name(resultListener, "resultListener"), chrome.runtime.onMessage.addListener(resultListener), setTimeout(() => {
              chrome.runtime.onMessage.removeListener(resultListener), resolve(!1);
            }, 3e5);
          });
          try {
            chrome.windows.create({ url: pageUrl, type: "popup", width: 440, height: 300 });
          } catch {
            chrome.tabs.create({ url: pageUrl });
          }
          sendResponse({ granted: await resultPromise });
        })(), !0);
      case "revokePermission":
        return [].concat(request.permission).includes("menus") ? (sendResponse({ revoked: !1 }), !1) : (chrome.permissions.remove(
          { permissions: [].concat(request.permission) },
          (removed) => {
            chrome.runtime.lastError ? sendResponse({
              revoked: !1,
              error: chrome.runtime.lastError.message
            }) : sendResponse({ revoked: removed });
          }
        ), !0);
      case "updateUserId":
        return request.userId && request.userId !== state.currentUserId && (state.currentUserId = request.userId, state.latestPresence = null, state.pollingInterval && clearInterval(state.pollingInterval), pollUserPresence(), state.pollingInterval = setInterval(pollUserPresence, 5e3)), !1;
      case "presencePollResult":
        return !1;
      case "getLatestPresence":
        return sendResponse({ presence: state.latestPresence }), !1;
      case "wearOutfit":
        return wearOutfit(request.outfitId).then(sendResponse), !0;
      case "fetchRobloxApi":
        return callRobloxApiBackground(request.options).then(async (response) => {
          let headers = {};
          response.headers.forEach(
            (val, key) => headers[key] = val
          );
          let body = await response.text().catch(() => null);
          sendResponse({
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers,
            body
          });
        }).catch((err) => {
          console.error("RoValra: Background API fetch failed", err), sendResponse({
            ok: !1,
            status: 500,
            statusText: "Extension Error",
            body: null
          });
        }), !0;
      case "fetchBinaryResource":
        return callRobloxApiBackground({
          fullUrl: request.url,
          method: request.method || "GET",
          headers: request.headers || {},
          credentials: request.credentials,
          noCache: !!request.noCache,
          isRovalraApi: /(^https:\/\/)([^/]+\.)?rovalra\.com\//i.test(request.url || "")
        }).then(async (response) => {
          let headers = {};
          response.headers.forEach(
            (val, key) => headers[key] = val
          );
          let buffer = await response.arrayBuffer().catch(() => null);
          sendResponse({
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers,
            contentType: response.headers.get("content-type") || "application/octet-stream",
            bodyBase64: buffer ? arrayBufferToBase64(buffer) : null
          });
        }).catch((err) => {
          console.error("RoValra: Background binary fetch failed", err), sendResponse({
            ok: !1,
            status: 500,
            statusText: "Extension Error",
            bodyBase64: null,
            contentType: "application/octet-stream"
          });
        }), !0;
      case "updateContextMenu":
        return chrome.menus && chrome.storage.local.get(
          ["copyIdEnabled", "copyUniverseIdEnabled"],
          (settings) => {
            chrome.menus.removeAll(() => {
              !chrome.runtime.lastError && request.ids?.length > 0 && request.ids.forEach((item) => {
                item.type === "Universe" ? settings.copyUniverseIdEnabled && chrome.menus.create({
                  id: `rovalra-copy-universe-${item.id}`,
                  title: "Copy Universe ID",
                  contexts: ["link"]
                }) : settings.copyIdEnabled && chrome.menus.create({
                  id: `rovalra-copy-${item.id}`,
                  title: `Copy ${item.type} ID`,
                  contexts: ["link"]
                });
              });
            });
          }
        ), !1;
    }
    return !1;
  });
  chrome.storage.local.get("MemoryleakFixEnabled", (result) => {
    result.MemoryleakFixEnabled && (state.isMemoryFixEnabled = !0, setupNavigationListener());
  });
  updateUserAgentRule();
  updateAvatarRotator();
  setupContextMenuListener();
  function luDecompose(A) {
    let n = A.length, LU = A, P = new Int32Array(n);
    for (let i = 0; i < n; i++) P[i] = i;
    for (let k = 0; k < n; k++) {
      let pivot = k;
      for (let i = k + 1; i < n; i++)
        Math.abs(LU[i][k]) > Math.abs(LU[pivot][k]) && (pivot = i);
      if (pivot !== k) {
        let tmpRow = LU[k];
        LU[k] = LU[pivot], LU[pivot] = tmpRow;
        let tmpP = P[k];
        P[k] = P[pivot], P[pivot] = tmpP;
      }
      let pivotVal = LU[k][k];
      if (!(Math.abs(pivotVal) < 1e-18))
        for (let i = k + 1; i < n; i++) {
          LU[i][k] /= pivotVal;
          let mult = LU[i][k], rowI = LU[i], rowK = LU[k];
          for (let j = k + 1; j < n; j++) rowI[j] -= mult * rowK[j];
        }
    }
    return { LU, P };
  }
  __name(luDecompose, "luDecompose");
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "OFFLOAD_RBF_MATH") {
      let [_A, _bx, _by, _bz] = request.data, A = _A.map((row) => row instanceof Float32Array ? row : Array.isArray(row) ? new Float32Array(row) : new Float32Array(Object.values(row))), bx = _bx instanceof Float32Array ? _bx : new Float32Array(Object.values(_bx)), by = _by instanceof Float32Array ? _by : new Float32Array(Object.values(_by)), bz = _bz instanceof Float32Array ? _bz : new Float32Array(Object.values(_bz)), { LU, P } = luDecompose(A), n = LU.length, result = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        let pIdx = P[i];
        result[i * 3 + 0] = bx[pIdx], result[i * 3 + 1] = by[pIdx], result[i * 3 + 2] = bz[pIdx];
      }
      for (let i = 0; i < n; i++) {
        let row = LU[i], sumX = result[i * 3 + 0], sumY = result[i * 3 + 1], sumZ = result[i * 3 + 2];
        for (let j = 0; j < i; j++) {
          let val = row[j], rj = j * 3;
          sumX -= val * result[rj + 0], sumY -= val * result[rj + 1], sumZ -= val * result[rj + 2];
        }
        result[i * 3 + 0] = sumX, result[i * 3 + 1] = sumY, result[i * 3 + 2] = sumZ;
      }
      for (let i = n - 1; i >= 0; i--) {
        let row = LU[i], sumX = result[i * 3 + 0], sumY = result[i * 3 + 1], sumZ = result[i * 3 + 2];
        for (let j = i + 1; j < n; j++) {
          let val = row[j], rj = j * 3;
          sumX -= val * result[rj + 0], sumY -= val * result[rj + 1], sumZ -= val * result[rj + 2];
        }
        let div = row[i];
        result[i * 3 + 0] = sumX / div, result[i * 3 + 1] = sumY / div, result[i * 3 + 2] = sumZ / div;
      }
      sendResponse(result);
    }
    return !0;
  });
})();
