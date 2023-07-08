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
      "name": "updateMainStateOwner",
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
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createStakingRound",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
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
          "name": "mainStateAccount",
          "isMut": true,
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
      "args": [
        {
          "name": "roundInfo",
          "type": {
            "defined": "StakingRoundInput"
          }
        }
      ]
    },
    {
      "name": "calculateFinalStakingDays",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "calculateStakingReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "whiteNftsStakeInfo",
            "type": {
              "defined": "StakeInfo"
            }
          },
          {
            "name": "diamondNftsStakeInfo",
            "type": {
              "defined": "StakeInfo"
            }
          },
          {
            "name": "legendaryNftStakeInfo",
            "type": {
              "defined": "StakeInfo"
            }
          },
          {
            "name": "startStakingTime",
            "type": "i64"
          },
          {
            "name": "endStakingTime",
            "type": "i64"
          },
          {
            "name": "stakingRounds",
            "type": "u64"
          },
          {
            "name": "totalRewardableAmount",
            "type": "u64"
          },
          {
            "name": "overallBtcAmount",
            "type": "u64"
          },
          {
            "name": "overallClaimedBtcAmount",
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
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "nftType",
            "type": {
              "defined": "NftType"
            }
          },
          {
            "name": "claimableRewardAmount",
            "type": "u64"
          },
          {
            "name": "isClaimed",
            "type": "bool"
          },
          {
            "name": "isRewardCalculated",
            "type": "bool"
          },
          {
            "name": "isFinalStakindTimeCalculated",
            "type": "bool"
          },
          {
            "name": "stakedDays",
            "type": "i64"
          },
          {
            "name": "lastClaimedRound",
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
      "name": "StakeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalCurrentStaked",
            "type": "u64"
          },
          {
            "name": "totalPartialStaked",
            "type": "u64"
          },
          {
            "name": "rewardRate",
            "type": "u64"
          },
          {
            "name": "totalStakingDays",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MainStateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "legendaryNftRewardRate",
            "type": "u64"
          },
          {
            "name": "diamondNftRewardRate",
            "type": "u64"
          },
          {
            "name": "whiteNftRewardRate",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "StakingRoundInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rewardAmount",
            "type": "u64"
          },
          {
            "name": "roundStartTime",
            "type": "i64"
          },
          {
            "name": "roundDurationInDays",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "NftType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "White"
          },
          {
            "name": "Diamond"
          },
          {
            "name": "Legendary"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OnlyOwnerCanCall",
      "msg": "Owner can only call"
    },
    {
      "code": 6001,
      "name": "OwnershipMissMatch",
      "msg": "You haven't owner the item"
    },
    {
      "code": 6002,
      "name": "NotStaked",
      "msg": "Nft haven't staked"
    },
    {
      "code": 6003,
      "name": "AlreadyStaked",
      "msg": "Nft Already Staked"
    },
    {
      "code": 6004,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6005,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6006,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6007,
      "name": "UnknownNft",
      "msg": "Unknown Nft"
    },
    {
      "code": 6008,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6009,
      "name": "NftInMarketplace",
      "msg": "Nft is in marketplace"
    },
    {
      "code": 6010,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6011,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6012,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    },
    {
      "code": 6013,
      "name": "ZeroRewardAmount",
      "msg": "Reward Amount Zero found might be already claimed"
    },
    {
      "code": 6014,
      "name": "StakingDaysAlreadyCalculated",
      "msg": "Staking days already calculated for this account"
    },
    {
      "code": 6015,
      "name": "RewardAlreadyCalculated",
      "msg": "Reward alread Calculated"
    },
    {
      "code": 6016,
      "name": "RewardAlreadyClaimed",
      "msg": "Reward Already claimed"
    },
    {
      "code": 6017,
      "name": "FinalStakingTimeNotCalculated",
      "msg": "Final staking time not calculated"
    },
    {
      "code": 6018,
      "name": "RewardNotCalculated",
      "msg": "Still the Reward not is not calculated by the admin"
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
      "name": "updateMainStateOwner",
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
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createStakingRound",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
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
          "name": "mainStateAccount",
          "isMut": true,
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
      "args": [
        {
          "name": "roundInfo",
          "type": {
            "defined": "StakingRoundInput"
          }
        }
      ]
    },
    {
      "name": "calculateFinalStakingDays",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "calculateStakingReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "whiteNftsStakeInfo",
            "type": {
              "defined": "StakeInfo"
            }
          },
          {
            "name": "diamondNftsStakeInfo",
            "type": {
              "defined": "StakeInfo"
            }
          },
          {
            "name": "legendaryNftStakeInfo",
            "type": {
              "defined": "StakeInfo"
            }
          },
          {
            "name": "startStakingTime",
            "type": "i64"
          },
          {
            "name": "endStakingTime",
            "type": "i64"
          },
          {
            "name": "stakingRounds",
            "type": "u64"
          },
          {
            "name": "totalRewardableAmount",
            "type": "u64"
          },
          {
            "name": "overallBtcAmount",
            "type": "u64"
          },
          {
            "name": "overallClaimedBtcAmount",
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
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "nftType",
            "type": {
              "defined": "NftType"
            }
          },
          {
            "name": "claimableRewardAmount",
            "type": "u64"
          },
          {
            "name": "isClaimed",
            "type": "bool"
          },
          {
            "name": "isRewardCalculated",
            "type": "bool"
          },
          {
            "name": "isFinalStakindTimeCalculated",
            "type": "bool"
          },
          {
            "name": "stakedDays",
            "type": "i64"
          },
          {
            "name": "lastClaimedRound",
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
      "name": "StakeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalCurrentStaked",
            "type": "u64"
          },
          {
            "name": "totalPartialStaked",
            "type": "u64"
          },
          {
            "name": "rewardRate",
            "type": "u64"
          },
          {
            "name": "totalStakingDays",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MainStateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeNftCollectionId",
            "type": "publicKey"
          },
          {
            "name": "wBtcTokenId",
            "type": "publicKey"
          },
          {
            "name": "legendaryNftRewardRate",
            "type": "u64"
          },
          {
            "name": "diamondNftRewardRate",
            "type": "u64"
          },
          {
            "name": "whiteNftRewardRate",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "StakingRoundInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rewardAmount",
            "type": "u64"
          },
          {
            "name": "roundStartTime",
            "type": "i64"
          },
          {
            "name": "roundDurationInDays",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "NftType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "White"
          },
          {
            "name": "Diamond"
          },
          {
            "name": "Legendary"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OnlyOwnerCanCall",
      "msg": "Owner can only call"
    },
    {
      "code": 6001,
      "name": "OwnershipMissMatch",
      "msg": "You haven't owner the item"
    },
    {
      "code": 6002,
      "name": "NotStaked",
      "msg": "Nft haven't staked"
    },
    {
      "code": 6003,
      "name": "AlreadyStaked",
      "msg": "Nft Already Staked"
    },
    {
      "code": 6004,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6005,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6006,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6007,
      "name": "UnknownNft",
      "msg": "Unknown Nft"
    },
    {
      "code": 6008,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6009,
      "name": "NftInMarketplace",
      "msg": "Nft is in marketplace"
    },
    {
      "code": 6010,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6011,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6012,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    },
    {
      "code": 6013,
      "name": "ZeroRewardAmount",
      "msg": "Reward Amount Zero found might be already claimed"
    },
    {
      "code": 6014,
      "name": "StakingDaysAlreadyCalculated",
      "msg": "Staking days already calculated for this account"
    },
    {
      "code": 6015,
      "name": "RewardAlreadyCalculated",
      "msg": "Reward alread Calculated"
    },
    {
      "code": 6016,
      "name": "RewardAlreadyClaimed",
      "msg": "Reward Already claimed"
    },
    {
      "code": 6017,
      "name": "FinalStakingTimeNotCalculated",
      "msg": "Final staking time not calculated"
    },
    {
      "code": 6018,
      "name": "RewardNotCalculated",
      "msg": "Still the Reward not is not calculated by the admin"
    }
  ]
};
