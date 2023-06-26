export type Stake2earn = {
  "version": "0.1.0",
  "name": "stake2earn",
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
      "name": "depositRewardToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "ownerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainAccountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainAccount",
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
          "name": "amount",
          "type": "u64"
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
          "name": "mainState",
          "isMut": false,
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
          "name": "dummyNft",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftStateAccountAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dummyNftMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dummyNftMasterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "userAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccountAtaD",
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
          "name": "userAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccountAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
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
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStateAccountAta",
          "isMut": false,
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
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userRewardTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccountRewardTokenAta",
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
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "currentStaked",
            "type": "u64"
          },
          {
            "name": "nftRewardPerWeek",
            "type": "u64"
          },
          {
            "name": "legendaryNftRewardPerWeek",
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
            "name": "dummyNftId",
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
            "name": "isLegendaryNft",
            "type": "bool"
          },
          {
            "name": "claimedWeek",
            "type": "u64"
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
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "nftRewardPerWeek",
            "type": "u64"
          },
          {
            "name": "legendaryNftRewardPerWeek",
            "type": "u64"
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
      "name": "CreatorMissMatch",
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
      "msg": "Unknown Nft"
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
    },
    {
      "code": 6016,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6017,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    }
  ]
};

export const IDL: Stake2earn = {
  "version": "0.1.0",
  "name": "stake2earn",
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
      "name": "depositRewardToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "ownerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainAccountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainAccount",
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
          "name": "amount",
          "type": "u64"
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
          "name": "mainState",
          "isMut": false,
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
          "name": "dummyNft",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftStateAccountAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dummyNftMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dummyNftMasterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
          "name": "userAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccountAtaD",
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
          "name": "userAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftStateAccountAtaD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
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
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStateAccountAta",
          "isMut": false,
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
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userRewardTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccountRewardTokenAta",
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
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "currentStaked",
            "type": "u64"
          },
          {
            "name": "nftRewardPerWeek",
            "type": "u64"
          },
          {
            "name": "legendaryNftRewardPerWeek",
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
            "name": "dummyNftId",
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
            "name": "isLegendaryNft",
            "type": "bool"
          },
          {
            "name": "claimedWeek",
            "type": "u64"
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
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "nftRewardPerWeek",
            "type": "u64"
          },
          {
            "name": "legendaryNftRewardPerWeek",
            "type": "u64"
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
      "name": "CreatorMissMatch",
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
      "msg": "Unknown Nft"
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
    },
    {
      "code": 6016,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6017,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    }
  ]
};
