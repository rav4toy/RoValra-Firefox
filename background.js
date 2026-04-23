/*!
 * rovalra v2.4.15
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
/* rav4 :: recreationalactivevehicle */

(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });

  // src/content/core/transactions/fiatConfig.js
  var ROBUX_FIAT_RATE_MODE_NORMAL = "normal", ROBUX_FIAT_RATE_MODE_DEVEX = "devex";
  var ROBUX_FIAT_ESTIMATE_STYLE_MODE_SOLID = "solid", ROBUX_FIAT_ESTIMATE_STYLE_MODE_GRADIENT = "gradient", ROBUX_FIAT_ESTIMATE_DEFAULT_GRADIENT = {
    enabled: !0,
    color1: "#5fa8ff",
    color2: "#d05bff",
    angle: 90,
    fade: 100
  };
  var ROBUX_FIAT_ESTIMATE_STYLE_OPTIONS = [
    {
      value: ROBUX_FIAT_ESTIMATE_STYLE_MODE_SOLID,
      label: "Solid Color"
    },
    {
      value: ROBUX_FIAT_ESTIMATE_STYLE_MODE_GRADIENT,
      label: "Gradient"
    }
  ], TRANSACTION_FIAT_CURRENCY_OPTIONS = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "NZD", label: "NZD - New Zealand Dollar" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "CNY", label: "CNY - Chinese Yuan" },
    { value: "HKD", label: "HKD - Hong Kong Dollar" },
    { value: "SGD", label: "SGD - Singapore Dollar" },
    { value: "KRW", label: "KRW - South Korean Won" },
    { value: "TWD", label: "TWD - Taiwan Dollar" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "PKR", label: "PKR - Pakistani Rupee" },
    { value: "BDT", label: "BDT - Bangladeshi Taka" },
    { value: "IDR", label: "IDR - Indonesian Rupiah" },
    { value: "MYR", label: "MYR - Malaysian Ringgit" },
    { value: "PHP", label: "PHP - Philippine Peso" },
    { value: "THB", label: "THB - Thai Baht" },
    { value: "VND", label: "VND - Vietnamese Dong" },
    { value: "AED", label: "AED - UAE Dirham" },
    { value: "SAR", label: "SAR - Saudi Riyal" },
    { value: "QAR", label: "QAR - Qatari Riyal" },
    { value: "KWD", label: "KWD - Kuwaiti Dinar" },
    { value: "BHD", label: "BHD - Bahraini Dinar" },
    { value: "OMR", label: "OMR - Omani Rial" },
    { value: "ILS", label: "ILS - Israeli New Shekel" },
    { value: "EGP", label: "EGP - Egyptian Pound" },
    { value: "NGN", label: "NGN - Nigerian Naira" },
    { value: "KES", label: "KES - Kenyan Shilling" },
    { value: "MAD", label: "MAD - Moroccan Dirham" },
    { value: "ZAR", label: "ZAR - South African Rand" },
    { value: "CHF", label: "CHF - Swiss Franc" },
    { value: "SEK", label: "SEK - Swedish Krona" },
    { value: "NOK", label: "NOK - Norwegian Krone" },
    { value: "DKK", label: "DKK - Danish Krone" },
    { value: "ISK", label: "ISK - Icelandic Krona" },
    { value: "PLN", label: "PLN - Polish Zloty" },
    { value: "CZK", label: "CZK - Czech Koruna" },
    { value: "HUF", label: "HUF - Hungarian Forint" },
    { value: "RON", label: "RON - Romanian Leu" },
    { value: "BGN", label: "BGN - Bulgarian Lev" },
    { value: "HRK", label: "HRK - Croatian Kuna" },
    { value: "RSD", label: "RSD - Serbian Dinar" },
    { value: "UAH", label: "UAH - Ukrainian Hryvnia" },
    { value: "RUB", label: "RUB - Russian Ruble" },
    { value: "KZT", label: "KZT - Kazakhstani Tenge" },
    { value: "TRY", label: "TRY - Turkish Lira" },
    { value: "BRL", label: "BRL - Brazilian Real" },
    { value: "MXN", label: "MXN - Mexican Peso" },
    { value: "ARS", label: "ARS - Argentine Peso" },
    { value: "CLP", label: "CLP - Chilean Peso" },
    { value: "COP", label: "COP - Colombian Peso" },
    { value: "PEN", label: "PEN - Peruvian Sol" },
    { value: "UYU", label: "UYU - Uruguayan Peso" },
    { value: "VES", label: "VES - Venezuelan Bolivar" }
  ], TRANSACTION_FIAT_RATE_OPTIONS = [
    {
      value: ROBUX_FIAT_RATE_MODE_NORMAL,
      label: "Normal Purchase Rate"
    },
    {
      value: ROBUX_FIAT_RATE_MODE_DEVEX,
      label: "DevEx Cash-Out Rate"
    }
  ];

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
          locked: "Feature broke and Roblox made their own version.",
          isPermanent: !0,
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
        privateGameDetectionEnabled: {
          label: "View Private / Moderated Games",
          description: [
            "This recreates the experience page of private / moderated games, allowing you to view them."
          ],
          type: "checkbox",
          default: !1,
          requiredPermissions: ["webRequest"]
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
        TotalSpentGamesEnabled: {
          label: "Total Spent on Experience",
          description: [
            "This shows how much Robux you have spent total on this experience.",
            "This will scan your transactions in the background and store the total spent (locally)",
            "This may take a few mins before it works when first installing the extension."
          ],
          type: "checkbox",
          default: !0,
          storageKey: "rovalra_transactions_data"
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
            "- This feature requires the user to have their joins enabled for everyone or for you to be friends with them."
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
                "This only applies when viewing your own profile.",
                "If you arent a RoValra donator it will add a e:x into your about me so other RoValra users can see your environment"
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
            },
            environmentTester: {
              label: "Enable Environment Creator",
              description: [
                "Shows the Environment Creator tool on profiles to make custom client sided environments.",
                "This is to prepare for community environments",
                "This will overwrite all environment on profiles",
                "**This feature should only be enabled if you plan to make environments**"
              ],
              type: "checkbox",
              default: !1
            }
          }
        },
        trustedConnectionsEnabled: {
          label: "Trusted Friends",
          description: [
            "This feature allows you to accept, request and remove trusted friends on the site by pressing the (...) on their profile, this will only work for eligible friends.",
            "Eligible friends must be ID or face-scan verified and within your age bracket (13\u201317 or 18+).",
            "Trusted Friends might not be available in some regions.",
            "**Note:** Roblox uses an algorithm that may prevent adding someone even if they meet these requirements. [Learn more here.](https://en.help.roblox.com/hc/en-us/articles/46158344285204)"
          ],
          type: "checkbox",
          default: !0
        },
        lastOnlineEnabled: {
          label: "Show Last Online / Last Seen",
          description: [
            "Shows when a user was last online / seen on their profile.",
            "Only works for friends."
          ],
          type: "checkbox",
          default: !0
        },
        friendsSinceEnabled: {
          label: "Friends Since",
          description: "This feature shows how long you have been friends with someone on their profile and in your friends list.",
          type: "checkbox",
          default: !0
        },
        showFriendedFromEnabled: {
          label: "Show Friended From",
          description: "This shows where you became friends with a user e.g in game, profile etc",
          type: "checkbox",
          default: !0
        },
        lastPlayedTogetherEnabled: {
          label: "Most Played Together",
          description: "Shows the experience you played the most with a friend on their profile.",
          type: "checkbox",
          default: !0
        },
        bulkUnfriendEnabled: {
          label: "Bulk Unfriend",
          description: "This allows you to unfriend people from your friends list in bulk",
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
            },
            disableVideoAudio: {
              label: "Disable Video Audio In status",
              description: [
                "Mutes audio on videos in statuses.",
                "Select people can set videos in their status, and this mutes it.",
                "**Only select people can add videos to their status, and the list wont expand**"
              ],
              type: "checkbox",
              default: !1
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
        },
        profileBackgroundGradientEnabled: {
          label: "Custom Profile Background Gradient",
          description: [
            "Shows a users selected gradient on their profile"
          ],
          type: "checkbox",
          default: !0,
          childSettings: {
            profileGradient: {
              label: "Profile Gradient",
              description: "Set your own gradient for your own profile",
              type: "gradient",
              donatorTier: 2,
              donatorReason: "Donator 2 is required to set a custom profile gradient. This feature is purely cosmetic in order to reward donators",
              default: {
                enabled: !1,
                color1: "#667eea",
                color2: "#764ba2",
                angle: 135,
                fade: 100
              }
            },
            applyGradientToAvatarTile: {
              label: "Apply Gradient Background to Profile Thumbnails",
              description: [
                "This adds the Gradient Background to profile thumbnails across the site like on the home page"
              ],
              type: "checkbox",
              default: !0
            }
          }
        },
        bannedUserDetectionEnabled: {
          label: "View Banned Users Profile",
          description: ["Allows you to view banned users Profile."],
          type: "checkbox",
          default: !1,
          requiredPermissions: ["webRequest"]
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
        stickyAvatarEnabled: {
          label: "Sticky Avatar Preview",
          description: "This forces the avatar preview to always be in view on the avatar editor.",
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
        robuxFiatEstimatesEnabled: {
          label: "Robux Fiat Estimates",
          description: [
            "Shows a money estimate beside Robux values on the transactions page, group revenue pages, and related Robux UI.",
            "You can choose both the display currency and whether the estimate uses Roblox purchase pricing or the current DevEx cash-out rate."
          ],
          type: "checkbox",
          default: !1,
          experimental: "Sometimes shows the wrong amount. And it might causes some issues on the site.",
          childSettings: {
            robuxFiatDisplayCurrency: {
              label: "Display Currency",
              description: [
                "Select which currency RoValra should convert Robux estimates into."
              ],
              type: "select",
              options: TRANSACTION_FIAT_CURRENCY_OPTIONS,
              default: "USD"
            },
            robuxFiatRateMode: {
              label: "Valuation Mode",
              description: [
                "Normal Purchase Rate uses Roblox purchase pricing as the estimate source.",
                "DevEx Cash-Out Rate uses the current Roblox DevEx cash-out rate of $0.0038 per Earned Robux before converting to your selected currency."
              ],
              type: "select",
              options: TRANSACTION_FIAT_RATE_OPTIONS,
              default: "normal"
            },
            robuxFiatEstimateStyleMode: {
              label: "Text Style",
              description: [
                "Choose between a solid color or a two-color gradient for the fiat estimate text."
              ],
              type: "select",
              options: ROBUX_FIAT_ESTIMATE_STYLE_OPTIONS,
              default: ROBUX_FIAT_ESTIMATE_STYLE_MODE_SOLID
            },
            robuxFiatEstimateColor: {
              label: "Estimate Text Color",
              description: [
                "Pick the color used for the fiat estimate text shown next to Robux values. Used when Text Style is set to Solid Color."
              ],
              type: "color",
              default: "#7a7d81"
            },
            robuxFiatEstimateGradient: {
              label: "Estimate Text Gradient",
              description: [
                "Customize the gradient used for the fiat estimate text. Used when Text Style is set to Gradient."
              ],
              type: "gradient",
              default: ROBUX_FIAT_ESTIMATE_DEFAULT_GRADIENT
            },
            robuxFiatEstimateBold: {
              label: "Bold Estimate Text",
              description: ["Render the fiat estimate text in bold."],
              type: "checkbox",
              default: !1
            },
            robuxFiatEstimateItalic: {
              label: "Italic Estimate Text",
              description: [
                "Render the fiat estimate text in italic."
              ],
              type: "checkbox",
              default: !1
            }
          }
        },
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
          default: !0,
          childSettings: {
            tradeShowItemValues: {
              label: "Show Item Values",
              description: "Display Rolimons item values on individual trade item cards",
              type: "checkbox",
              default: !0
            },
            tradeShowProjectedIndicator: {
              label: "Show Projected Item Indicator",
              description: "Display warning icon for projected items",
              type: "checkbox",
              default: !0
            },
            tradeShowRareIndicator: {
              label: "Show Rare Item Indicator",
              description: "Display rare item indicator icon",
              type: "checkbox",
              default: !0
            },
            tradeShowItemInfo: {
              label: "Show Item Info / Trend / Demand",
              description: "Display item information tooltip with trend, demand and risk data",
              type: "checkbox",
              default: !0
            },
            tradeShowTotalValue: {
              label: "Show Total Trade Value",
              description: "Display total value summary line in trade offers",
              type: "checkbox",
              default: !0
            },
            tradeShowTotalDemand: {
              label: "Show Average Demand",
              description: "Display average demand summary line in trade offers",
              type: "checkbox",
              default: !0
            },
            tradeShowDiffPills: {
              label: "Show Value / RAP Difference Pills",
              description: "Display the value and RAP difference comparison pills at the bottom of the trade window",
              type: "checkbox",
              default: !0
            }
          }
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
        transactionsSidebarLinkEnabled: {
          label: "My Transactions sidebar link",
          description: "Adds a My Transactions link below Communities in the Roblox sidebar.",
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
        Customfont: {
          label: "Custom font",
          description: [
            "This allows to set custom font for the Roblox website."
          ],
          type: "checkbox",
          default: !1,
          childSettings: {
            Customfontlink: {
              label: "Google Fonts link",
              description: [
                "You can find Fonts at https://fonts.google.com/",
                'The link should look like "https://fonts.google.com/specimen/Comic+Neue"'
              ],
              type: "input",
              default: null,
              placeholder: "Enter Font Link here..."
            }
          }
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
        legacyThemeSwitcherEnabled: {
          label: "Legacy Theme Switcher",
          description: [
            "This adds a dropdown in the Roblox settings which replicates how the old theme switcher worked",
            "This means you won't have to switch to your preferred theme when logging in on a new browser"
          ],
          type: "checkbox",
          default: !1
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
        showUserAgeEnabled: {
          label: "Show Friend Age Range",
          description: "This shows the account age range of anyone on your friends list.",
          type: "checkbox",
          default: !1,
          locked: "This was made when Roblox decided it was a good idea to leak everyones age range. It was only made to spread light on the issue and the issue has now been resolved.",
          isPermanent: !0
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
        forceFallbackAuth: {
          label: "Force Fallback Authentication",
          description: [
            "Forces the use of the fallback verification system instead of OAuth.",
            "This auth is used in cases where OAuth doesnt work"
          ],
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
    rotatorIndex: 0,
    bannedUserRedirects: /* @__PURE__ */ new Map(),
    privateGameRedirects: /* @__PURE__ */ new Map(),
    scanningUsers: /* @__PURE__ */ new Set(),
    transactionInterval: null
  };
  chrome.storage.session && chrome.storage.session.setAccessLevel && chrome.storage.session.setAccessLevel({
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
  }).catch(
    (err) => console.error("RoValra: Failed to set session access level", err)
  );
  function getDefaultSettings() {
	/*__rav4*/
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
  function onBeforeRedirectHandler(details) {
    let match = details.url.match(/users\/(\d+)\/profile/);
    match && match[1] && state.bannedUserRedirects.set(details.tabId, match[1]);
  }
  __name(onBeforeRedirectHandler, "onBeforeRedirectHandler");
  function updateBannedUserListener() {
    chrome.webRequest && chrome.permissions.contains({ permissions: ["webRequest"] }, (granted) => {
      granted && chrome.storage.local.get(
        { bannedUserDetectionEnabled: !1 },
        (data) => {
          data.bannedUserDetectionEnabled ? chrome.webRequest.onBeforeRedirect.hasListener(
            onBeforeRedirectHandler
          ) || chrome.webRequest.onBeforeRedirect.addListener(
            onBeforeRedirectHandler,
            {
              urls: [
                "*://www.roblox.com/users/*/profile*"
              ]
            }
          ) : chrome.webRequest.onBeforeRedirect.removeListener(
            onBeforeRedirectHandler
          );
        }
      );
    });
  }
  __name(updateBannedUserListener, "updateBannedUserListener");
  function onPrivateGameRedirectHandler(details) {
    let match = details.url.match(/games\/(\d+)/);
    if (match && match[1]) {
      let placeId = match[1];
      state.privateGameRedirects.set(details.tabId, placeId);
    }
  }
  __name(onPrivateGameRedirectHandler, "onPrivateGameRedirectHandler");
  function updatePrivateGameListener() {
    chrome.webRequest && chrome.permissions.contains({ permissions: ["webRequest"] }, (granted) => {
      granted && chrome.storage.local.get(
        { privateGameDetectionEnabled: !0 },
        (data) => {
          data.privateGameDetectionEnabled ? chrome.webRequest.onBeforeRedirect.hasListener(
            onPrivateGameRedirectHandler
          ) || chrome.webRequest.onBeforeRedirect.addListener(
            onPrivateGameRedirectHandler,
            {
              urls: ["*://www.roblox.com/games/*"]
            }
          ) : chrome.webRequest.onBeforeRedirect.removeListener(
            onPrivateGameRedirectHandler
          );
        }
      );
    });
  }
  __name(updatePrivateGameListener, "updatePrivateGameListener");
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
    } = options, baseUrl = isRovalraApi ? subdomain === "www" ? "https://www.rovalra.com" : `https://${subdomain}.rovalra.com` : `https://${subdomain}.roblox.com`, urlBase = fullUrl || `${baseUrl}${endpoint}`;
    let isStaticBinaryRequest = !1;
    try {
      isStaticBinaryRequest = /\.(?:glb|gltf|bin|png|jpe?g|webp|gif|bmp|svg|ktx2?|hdr|mp3|ogg|wav)(?:$|[?#])/i.test(new URL(urlBase).pathname);
    } catch {
    }
    let shouldAppendMarker = !urlBase.includes("_RoValraRequest=") && !endpoint.includes("/player-hydration-service/v1/players/signed") && !isStaticBinaryRequest, url = shouldAppendMarker ? `${urlBase}${urlBase.includes("?") ? "&" : "?"}_RoValraRequest=` : urlBase, fetchHeaders = new Headers(headers || {});
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
  async function fetchAssetAsDataUrl(url) {
    let response = await fetch(url);
    if (!response.ok)
      throw new Error(`Asset fetch failed with status ${response.status}`);
    let contentType = response.headers.get("content-type") || "application/octet-stream", buffer = await response.arrayBuffer();
    return `data:${contentType};base64,${arrayBufferToBase64(buffer)}`;
  }
  __name(fetchAssetAsDataUrl, "fetchAssetAsDataUrl");
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
        endpoint: `/v3/outfits/${outfitId}/details`
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
      ), details.bodyColor3s && promises.push(
        callWithRetry({
          subdomain: "avatar",
          endpoint: "/v2/avatar/set-body-colors",
          method: "POST",
          body: details.bodyColor3s
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
  var TRANSACTIONS_DATA_KEY = "rovalra_transactions_data", TRANSACTION_REFRESH_DURATION = 300 * 1e3, TRANSACTION_REQUEST_DELAY = 5e3;
  async function fetchTransactionsPage(userId, cursor = null) {
    let endpoint = `/transaction-records/v1/users/${userId}/transactions?limit=100&transactionType=Purchase&itemPricingType=PaidAndLimited`;
    for (cursor && (endpoint += `&cursor=${encodeURIComponent(cursor)}`); ; )
      try {
        let response = await callRobloxApiBackground({
          subdomain: "apis",
          endpoint
        });
        if (response.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, 1e4));
          continue;
        }
        return response.ok ? await response.json() : null;
      } catch (error) {
        return console.error("RoValra: Failed to fetch transactions page", error), null;
      }
  }
  __name(fetchTransactionsPage, "fetchTransactionsPage");
  function processTransaction(transaction) {
    let base = {
      amount: Math.abs(transaction.currency.amount),
      purchaseToken: transaction.purchaseToken,
      creatorId: transaction.agent.id,
      creatorType: transaction.agent.type,
      creatorName: transaction.agent.name
    };
    return transaction.details.place ? {
      ...base,
      universeId: transaction.details.place.universeId,
      gameName: transaction.details.place.name
    } : base;
  }
  __name(processTransaction, "processTransaction");
  function mergeTransactionsIntoAggregated(existingAggregated, rawTransactions) {
    let updated = existingAggregated || {
      totals: { totalSpent: 0, totalTransactions: 0 },
      creators: {}
    };
    return rawTransactions.forEach((tx) => {
      let processed = processTransaction(tx);
      updated.totals.totalSpent += processed.amount, updated.totals.totalTransactions += 1;
      let creatorKey = String(processed.creatorId);
      updated.creators[creatorKey] || (updated.creators[creatorKey] = {
        name: processed.creatorName,
        type: processed.creatorType,
        totalSpent: 0,
        totalTransactions: 0,
        games: {}
      });
      let creator = updated.creators[creatorKey];
      if (creator.name = processed.creatorName || creator.name, creator.totalSpent += processed.amount, creator.totalTransactions += 1, processed.universeId) {
        creator.games[processed.universeId] || (creator.games[processed.universeId] = {
          name: processed.gameName,
          totalSpent: 0,
          totalTransactions: 0
        });
        let game = creator.games[processed.universeId];
        game.totalSpent += processed.amount, game.totalTransactions += 1;
      }
    }), updated;
  }
  __name(mergeTransactionsIntoAggregated, "mergeTransactionsIntoAggregated");
  async function handleBackgroundTransactionScan(userId) {
    if ((await chrome.storage.local.get({
      TotalSpentGamesEnabled: !0
    })).TotalSpentGamesEnabled && !state.scanningUsers.has(userId)) {
      state.scanningUsers.add(userId);
      try {
        let userData = ((await chrome.storage.local.get([TRANSACTIONS_DATA_KEY]))[TRANSACTIONS_DATA_KEY] || {})[userId] || {}, now = Date.now();
        if (userData.isFullyScanned) {
          let lastCheck = userData.lastIncrementalCheck || userData.lastFullScan || 0;
          if (now - lastCheck < TRANSACTION_REFRESH_DURATION) return;
          await runTransactionLoop(userId, userData, !0);
        } else
          await runTransactionLoop(userId, userData, !1);
      } finally {
        state.scanningUsers.delete(userId);
      }
    }
  }
  __name(handleBackgroundTransactionScan, "handleBackgroundTransactionScan");
  async function runTransactionLoop(userId, existingData, isIncremental) {
    let cursor = isIncremental ? null : existingData.scanCursor || null, pagesChecked = 0, foundMatch = !1, emptyPageCount = 0, seenTokens = /* @__PURE__ */ new Set(), currentAggregated = {
      totals: existingData.totals || { totalSpent: 0, totalTransactions: 0 },
      creators: existingData.creators || {},
      latestPurchaseTokens: existingData.latestPurchaseTokens || []
    };
    for (; ; ) {
      let data = await fetchTransactionsPage(userId, cursor);
      if (!data) break;
      if (!data.data || data.data.length === 0) {
        if (emptyPageCount++, emptyPageCount >= 3 || !data.nextPageCursor) break;
        cursor = data.nextPageCursor;
        continue;
      }
      emptyPageCount = 0;
      let newBatch = [];
      for (let tx of data.data)
        if (!seenTokens.has(tx.purchaseToken)) {
          if (seenTokens.add(tx.purchaseToken), isIncremental && currentAggregated.latestPurchaseTokens.includes(
            tx.purchaseToken
          )) {
            foundMatch = !0;
            break;
          }
          newBatch.push(tx);
        }
      if (currentAggregated = mergeTransactionsIntoAggregated(
        currentAggregated,
        newBatch
      ), pagesChecked === 0) {
        let firstTokens = data.data.slice(0, 2).map((tx) => tx.purchaseToken);
        currentAggregated.latestPurchaseTokens = [
          .../* @__PURE__ */ new Set([
            ...firstTokens,
            ...currentAggregated.latestPurchaseTokens
          ])
        ].slice(0, 2);
      }
      cursor = data.nextPageCursor, pagesChecked++;
      let allData = (await chrome.storage.local.get([TRANSACTIONS_DATA_KEY]))[TRANSACTIONS_DATA_KEY] || {};
      if (allData[userId] = {
        ...existingData,
        ...currentAggregated,
        latestPurchaseToken: currentAggregated.latestPurchaseTokens[0],
        scanCursor: isIncremental ? null : cursor,
        isFullyScanned: isIncremental || !cursor,
        isScanning: !isIncremental && !!cursor,
        [isIncremental ? "lastIncrementalCheck" : "lastFullScan"]: Date.now()
      }, await chrome.storage.local.set({ [TRANSACTIONS_DATA_KEY]: allData }), !cursor || foundMatch || isIncremental && pagesChecked >= 5)
        break;
      await new Promise((r) => setTimeout(r, TRANSACTION_REQUEST_DELAY));
    }
    isIncremental && !foundMatch && pagesChecked >= 5 && await runTransactionLoop(userId, currentAggregated, !1);
  }
  __name(runTransactionLoop, "runTransactionLoop");
  chrome.runtime.onInstalled.addListener((details) => {
    initializeSettings(details.reason), setupContextMenuListener();
  });
  chrome.runtime.onStartup.addListener(() => {
    initializeSettings("startup"), setupContextMenuListener();
  });
  chrome.storage.onChanged.addListener((changes, namespace) => {
    namespace === "local" && (changes.MemoryleakFixEnabled && (state.isMemoryFixEnabled = changes.MemoryleakFixEnabled.newValue, state.isMemoryFixEnabled && setupNavigationListener()), (changes.rovalra_avatar_rotator_enabled || changes.rovalra_avatar_rotator_ids || changes.rovalra_avatar_rotator_interval) && updateAvatarRotator(), changes.privateGameDetectionEnabled && updatePrivateGameListener(), changes.bannedUserDetectionEnabled && updateBannedUserListener(), changes.TotalSpentGamesEnabled && (changes.TotalSpentGamesEnabled.newValue === !1 ? state.transactionInterval && (clearInterval(state.transactionInterval), state.transactionInterval = null) : state.currentUserId && (handleBackgroundTransactionScan(state.currentUserId), state.transactionInterval && clearInterval(state.transactionInterval), state.transactionInterval = setInterval(() => {
      handleBackgroundTransactionScan(state.currentUserId);
    }, TRANSACTION_REFRESH_DURATION))));
  });
  chrome.permissions.onAdded.addListener((permissions) => {
    permissions.permissions?.includes("webNavigation") && setupNavigationListener(), permissions.permissions?.includes("menus") && setupContextMenuListener(), permissions.permissions?.includes("webRequest") && (updateBannedUserListener(), updatePrivateGameListener()), chrome.tabs.query({}, (tabs) => {
      tabs.forEach(
        (tab) => chrome.tabs.sendMessage(tab.id, { action: "permissionsUpdated" }).catch(() => {
        })
      );
    });
  });
  chrome.permissions.onRemoved.addListener((permissions) => {
    permissions.permissions?.includes("webNavigation") && chrome.webNavigation.onBeforeNavigate.hasListener(navigationListener) && chrome.webNavigation.onBeforeNavigate.removeListener(
      navigationListener
    ), permissions.permissions?.includes("menus") && chrome.menus?.onClicked.hasListener(contextMenuClickListener) && chrome.menus.onClicked.removeListener(contextMenuClickListener), permissions.permissions?.includes("webRequest") && chrome.webRequest.onBeforeRedirect.removeListener(
      onBeforeRedirectHandler
    ), chrome.tabs.query({}, (tabs) => {
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
      case "checkPermission": {
        let permissions = [].concat(request.permission).map((perm) => perm === "contextMenus" ? "menus" : perm).filter(Boolean);
        return permissions.includes("menus") ? (sendResponse({ granted: !0 }), !1) : (chrome.permissions.contains(
          { permissions },
          (granted) => {
            sendResponse({ granted });
          }
        ), !0);
      }
      case "requestPermission": {
        let permissions = [].concat(request.permission).map((perm) => perm === "contextMenus" ? "menus" : perm).filter(Boolean), needsPrompt = permissions.filter((perm) => perm !== "menus");
        if (needsPrompt.length === 0)
          return sendResponse({ granted: !0 }), !1;
        return ((async () => {
          let requestId = "perm_" + Date.now() + "_" + Math.random().toString(36).slice(2), pageUrl = chrome.runtime.getURL(
            "public/Assets/permission_request.html?permissions=" + encodeURIComponent(JSON.stringify(needsPrompt)) + "&requestId=" + encodeURIComponent(requestId)
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
            chrome.windows.create({ url: pageUrl, type: "popup", width: 480, height: 340 });
          } catch {
            chrome.tabs.create({ url: pageUrl });
          }
          sendResponse({ granted: await resultPromise });
        })(), !0);
      }
      case "revokePermission": {
        let permissions = [].concat(request.permission).map((perm) => perm === "contextMenus" ? "menus" : perm).filter(Boolean), removablePermissions = permissions.filter((perm) => perm !== "menus");
        return removablePermissions.length === 0 ? (sendResponse({ revoked: !1 }), !1) : (chrome.permissions.remove(
          { permissions: removablePermissions },
          (removed) => {
            chrome.runtime.lastError ? sendResponse({
              revoked: !1,
              error: chrome.runtime.lastError.message
            }) : sendResponse({ revoked: removed });
          }
        ), !0);
      }
      case "updateUserId":
        return request.userId && request.userId !== state.currentUserId && (state.currentUserId = request.userId, state.latestPresence = null, state.pollingInterval && clearInterval(state.pollingInterval), pollUserPresence(), state.pollingInterval = setInterval(pollUserPresence, 5e3), state.transactionInterval && (clearInterval(state.transactionInterval), state.transactionInterval = null), chrome.storage.local.get(
          { TotalSpentGamesEnabled: !0 },
          (settings) => {
            settings.TotalSpentGamesEnabled && (handleBackgroundTransactionScan(
              state.currentUserId
            ), state.transactionInterval = setInterval(() => {
              handleBackgroundTransactionScan(
                state.currentUserId
              );
            }, TRANSACTION_REFRESH_DURATION));
          }
        )), !1;
      case "triggerTransactionScan":
        return handleBackgroundTransactionScan(request.userId), !1;
      case "getBannedUserRedirect": {
        let userId = state.bannedUserRedirects.get(sender.tab?.id);
        return state.bannedUserRedirects.delete(sender.tab?.id), sendResponse({ userId }), !1;
      }
      case "getPrivateGameRedirect": {
        let placeId = state.privateGameRedirects.get(sender.tab?.id);
        return state.privateGameRedirects.delete(sender.tab?.id), sendResponse({ placeId }), !1;
      }
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
      case "fetchAssetAsDataUrl":
        return fetchAssetAsDataUrl(request.url).then((dataUrl) => {
          sendResponse({ ok: !0, dataUrl });
        }).catch((err) => {
          console.error("RoValra: Background asset fetch failed", err), sendResponse({
            ok: !1,
            error: err.message
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
                  title: item.title,
                  contexts: ["link"],
                  documentUrlPatterns: [
                    "*://*.roblox.com/*"
                  ]
                }) : settings.copyIdEnabled && chrome.menus.create({
                  id: `rovalra-copy-${item.id}`,
                  title: item.title,
                  contexts: ["link"],
                  documentUrlPatterns: [
                    "*://*.roblox.com/*"
                  ]
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
  updateBannedUserListener();
  updatePrivateGameListener();
})();
