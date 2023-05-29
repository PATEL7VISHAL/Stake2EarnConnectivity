export type SleepBe = {
  "version": "0.1.0",
  "name": "sleep_be",
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
          "name": "input",
          "type": {
            "defined": "MainStateInput"
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
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "initNftState",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
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
      "name": "stakeNft",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStateAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "stakingType",
          "type": {
            "defined": "StakingType"
          }
        }
      ]
    },
    {
      "name": "unstakeNft",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStateAta",
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
    },
    {
      "name": "payFee",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": false,
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
      "name": "sellNft",
      "accounts": [
        {
          "name": "seller",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyNft",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
    }
  ],
  "accounts": [
    {
      "name": "mainState",
      "docs": [
        "Prefix: SEED_MAIN_STATE"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "rewardFee",
            "type": "u64"
          },
          {
            "name": "stakeNftOwner",
            "type": "publicKey"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalSoldNft",
            "type": "u64"
          },
          {
            "name": "currentStaked",
            "type": "u64"
          },
          {
            "name": "currentInMarketplace",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "nftState",
      "docs": [
        "SEEDS: SEED_NFT_STATE + MINT.key().as_ref()"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "currentOwner",
            "type": "publicKey"
          },
          {
            "name": "isInStake",
            "type": "bool"
          },
          {
            "name": "isInMarketplace",
            "type": "bool"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "stakingType",
            "type": {
              "defined": "StakingType"
            }
          }
        ]
      }
    },
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "currentStaked",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MainStateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "rewardFee",
            "type": "u64"
          },
          {
            "name": "stakeNftOwner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "StakingType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Variant1"
          },
          {
            "name": "Variant2"
          },
          {
            "name": "Variant3"
          },
          {
            "name": "Unknown"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "CreatorNotFound",
      "msg": "Nft Creator not Found !"
    },
    {
      "code": 6001,
      "name": "CreateMissMatch",
      "msg": "Nft Creator Id miss Match !"
    },
    {
      "code": 6002,
      "name": "OwnershipMissMatch",
      "msg": "You haven't owner the item"
    },
    {
      "code": 6003,
      "name": "NotStaked",
      "msg": "Nft haven't staked"
    },
    {
      "code": 6004,
      "name": "AlreadyStaked",
      "msg": "Nft Already Staked"
    },
    {
      "code": 6005,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6006,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6007,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6008,
      "name": "UnknownNft",
      "msg": "Unknown Nfto"
    },
    {
      "code": 6009,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6010,
      "name": "NftInMarketplace",
      "msg": "Nft is in marketplace"
    },
    {
      "code": 6011,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6012,
      "name": "AlreadyInMarketplace",
      "msg": "Nft is in marketplace"
    },
    {
      "code": 6013,
      "name": "NftNotInMarketplace",
      "msg": "Nft not found in marketPlace"
    },
    {
      "code": 6014,
      "name": "SelfSelling",
      "msg": "Self Selling of nft not allow"
    },
    {
      "code": 6015,
      "name": "SellerMissMatch",
      "msg": "Seller MissMatch"
    }
  ]
};

export const IDL: SleepBe = {
  "version": "0.1.0",
  "name": "sleep_be",
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
          "name": "input",
          "type": {
            "defined": "MainStateInput"
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
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "initNftState",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
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
      "name": "stakeNft",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStateAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "stakingType",
          "type": {
            "defined": "StakingType"
          }
        }
      ]
    },
    {
      "name": "unstakeNft",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStateAta",
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
    },
    {
      "name": "payFee",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": false,
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
      "name": "sellNft",
      "accounts": [
        {
          "name": "seller",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyNft",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
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
    }
  ],
  "accounts": [
    {
      "name": "mainState",
      "docs": [
        "Prefix: SEED_MAIN_STATE"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "rewardFee",
            "type": "u64"
          },
          {
            "name": "stakeNftOwner",
            "type": "publicKey"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalSoldNft",
            "type": "u64"
          },
          {
            "name": "currentStaked",
            "type": "u64"
          },
          {
            "name": "currentInMarketplace",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "nftState",
      "docs": [
        "SEEDS: SEED_NFT_STATE + MINT.key().as_ref()"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "currentOwner",
            "type": "publicKey"
          },
          {
            "name": "isInStake",
            "type": "bool"
          },
          {
            "name": "isInMarketplace",
            "type": "bool"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "stakingType",
            "type": {
              "defined": "StakingType"
            }
          }
        ]
      }
    },
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "currentStaked",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MainStateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "rewardFee",
            "type": "u64"
          },
          {
            "name": "stakeNftOwner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "StakingType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Variant1"
          },
          {
            "name": "Variant2"
          },
          {
            "name": "Variant3"
          },
          {
            "name": "Unknown"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "CreatorNotFound",
      "msg": "Nft Creator not Found !"
    },
    {
      "code": 6001,
      "name": "CreateMissMatch",
      "msg": "Nft Creator Id miss Match !"
    },
    {
      "code": 6002,
      "name": "OwnershipMissMatch",
      "msg": "You haven't owner the item"
    },
    {
      "code": 6003,
      "name": "NotStaked",
      "msg": "Nft haven't staked"
    },
    {
      "code": 6004,
      "name": "AlreadyStaked",
      "msg": "Nft Already Staked"
    },
    {
      "code": 6005,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6006,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6007,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6008,
      "name": "UnknownNft",
      "msg": "Unknown Nfto"
    },
    {
      "code": 6009,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6010,
      "name": "NftInMarketplace",
      "msg": "Nft is in marketplace"
    },
    {
      "code": 6011,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6012,
      "name": "AlreadyInMarketplace",
      "msg": "Nft is in marketplace"
    },
    {
      "code": 6013,
      "name": "NftNotInMarketplace",
      "msg": "Nft not found in marketPlace"
    },
    {
      "code": 6014,
      "name": "SelfSelling",
      "msg": "Self Selling of nft not allow"
    },
    {
      "code": 6015,
      "name": "SellerMissMatch",
      "msg": "Seller MissMatch"
    }
  ]
};
