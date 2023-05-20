export type HsNftBurn = {
  "version": "0.1.0",
  "name": "hs_nft_burn",
  "instructions": [
    {
      "name": "initMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validation",
          "type": {
            "array": [
              {
                "defined": "ValidationInfo"
              },
              3
            ]
          }
        }
      ]
    },
    {
      "name": "updateMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validation",
          "type": {
            "array": [
              {
                "defined": "ValidationInfo"
              },
              3
            ]
          }
        }
      ]
    },
    {
      "name": "setOwner",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "initUserState",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "burnNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "editionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMarkAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "getReward",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainAccountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "mainState",
      "docs": [
        "SEED: SEED_MAIN"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "burnValidations",
            "type": {
              "array": [
                {
                  "defined": "ValidationInfo"
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userState",
      "docs": [
        "SEED: SEED_USER_STATE"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "burnCount",
            "type": "u8"
          },
          {
            "name": "currentValidation",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "isRewardable",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ValidationInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "masterNftId",
            "type": "publicKey"
          },
          {
            "name": "requireToBurn",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AccountNotMatch",
      "msg": "MisMatch Account"
    },
    {
      "code": 6001,
      "name": "UnknownNft",
      "msg": "Require Edition NFT of specific collection"
    },
    {
      "code": 6002,
      "name": "CollectionNotFound",
      "msg": "Collection Not found"
    },
    {
      "code": 6003,
      "name": "CollectionMissMatch",
      "msg": "Collection MissMatch"
    },
    {
      "code": 6004,
      "name": "ExtraBurning",
      "msg": "You are burning Extra then it require"
    },
    {
      "code": 6005,
      "name": "RewardNotFound",
      "msg": "Reward Not found need to burn nft"
    }
  ]
};

export const IDL: HsNftBurn = {
  "version": "0.1.0",
  "name": "hs_nft_burn",
  "instructions": [
    {
      "name": "initMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validation",
          "type": {
            "array": [
              {
                "defined": "ValidationInfo"
              },
              3
            ]
          }
        }
      ]
    },
    {
      "name": "updateMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validation",
          "type": {
            "array": [
              {
                "defined": "ValidationInfo"
              },
              3
            ]
          }
        }
      ]
    },
    {
      "name": "setOwner",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "initUserState",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "burnNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "editionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMarkAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "getReward",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainAccountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "mainState",
      "docs": [
        "SEED: SEED_MAIN"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "burnValidations",
            "type": {
              "array": [
                {
                  "defined": "ValidationInfo"
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userState",
      "docs": [
        "SEED: SEED_USER_STATE"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "burnCount",
            "type": "u8"
          },
          {
            "name": "currentValidation",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "isRewardable",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ValidationInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "masterNftId",
            "type": "publicKey"
          },
          {
            "name": "requireToBurn",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AccountNotMatch",
      "msg": "MisMatch Account"
    },
    {
      "code": 6001,
      "name": "UnknownNft",
      "msg": "Require Edition NFT of specific collection"
    },
    {
      "code": 6002,
      "name": "CollectionNotFound",
      "msg": "Collection Not found"
    },
    {
      "code": 6003,
      "name": "CollectionMissMatch",
      "msg": "Collection MissMatch"
    },
    {
      "code": 6004,
      "name": "ExtraBurning",
      "msg": "You are burning Extra then it require"
    },
    {
      "code": 6005,
      "name": "RewardNotFound",
      "msg": "Reward Not found need to burn nft"
    }
  ]
};
