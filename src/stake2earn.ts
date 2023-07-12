export type Stake2earn = {
  "version": "0.1.0",
  "name": "stake2earn",
  "instructions": [
    {
      "name": "tempTest",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
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
      "name": "setMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
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
      "name": "updateProgramStateOwner",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
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
          "name": "programStateAccountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
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
      "name": "calculateAndDistributeReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dummyNft",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programStateAccountAtaD",
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
      "name": "stakeNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAta",
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
          "name": "userDummyNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAtaD",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAta",
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
          "name": "userDummyNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAtaD",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
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
          "name": "userDummyNftAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programStateAccountRewardTokenAta",
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
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "mainStateId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "mainState",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "currentStakingRound",
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
          },
          {
            "name": "isRewardCalculated",
            "type": "u64"
          },
          {
            "name": "nftsState",
            "type": {
              "array": [
                {
                  "defined": "NftState"
                },
                256
              ]
            }
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftState",
            "type": {
              "vec": {
                "defined": "NftState2"
              }
            }
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
            "name": "rewardRate",
            "type": "u64"
          },
          {
            "name": "totalStakingHours",
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
      "name": "NftState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "dummyNftId",
            "type": "publicKey"
          },
          {
            "name": "nftType",
            "type": "u64"
          },
          {
            "name": "isInStake",
            "type": "u64"
          },
          {
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "claimableRewardAmount",
            "type": "u64"
          },
          {
            "name": "isClaimed",
            "type": "u64"
          },
          {
            "name": "stakedHours",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "NftState2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "dummyNftId",
            "type": "publicKey"
          },
          {
            "name": "nftType",
            "type": "u64"
          },
          {
            "name": "isInStake",
            "type": "u64"
          },
          {
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "claimableRewardAmount",
            "type": "u64"
          },
          {
            "name": "isClaimed",
            "type": "u64"
          },
          {
            "name": "stakedHours",
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
      "name": "MissMatchMainStateId",
      "msg": "Miss match MainState Id"
    },
    {
      "code": 6003,
      "name": "NotStaked",
      "msg": "Nft haven't staked"
    },
    {
      "code": 6004,
      "name": "StateAlreadyInitialized",
      "msg": "Nft State already initialized"
    },
    {
      "code": 6005,
      "name": "StateNotInitialized",
      "msg": "Nft State not initialized"
    },
    {
      "code": 6006,
      "name": "StakingRoundNotFound",
      "msg": "Newer Staking round not create"
    },
    {
      "code": 6007,
      "name": "AlreadyStaked",
      "msg": "Nft Already Staked"
    },
    {
      "code": 6008,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6009,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6010,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6011,
      "name": "UnknownNft",
      "msg": "Unknown Nft"
    },
    {
      "code": 6012,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6013,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6014,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6015,
      "name": "DummyNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6016,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    },
    {
      "code": 6017,
      "name": "ZeroRewardAmount",
      "msg": "Reward Amount Zero found might be already claimed"
    },
    {
      "code": 6018,
      "name": "StakingDaysAlreadyCalculated",
      "msg": "Staking days already calculated for this account"
    },
    {
      "code": 6019,
      "name": "RewardAlreadyCalculated",
      "msg": "Reward alread Calculated"
    },
    {
      "code": 6020,
      "name": "RewardAlreadyClaimed",
      "msg": "Reward Already claimed"
    },
    {
      "code": 6021,
      "name": "FinalStakingTimeNotCalculated",
      "msg": "Final staking time not calculated"
    },
    {
      "code": 6022,
      "name": "RewardNotCalculated",
      "msg": "Still the Reward not is not calculated by the admin"
    },
    {
      "code": 6023,
      "name": "StakingRoundNotCompleted",
      "msg": "Staking Round Not Completed"
    },
    {
      "code": 6024,
      "name": "RewardCalculationModOn",
      "msg": "Call Lock because of Reward CalCulation Running"
    },
    {
      "code": 6025,
      "name": "RewardCalculationModOff",
      "msg": "Can Run Reward CalCulation if mode not active"
    }
  ]
};

export const IDL: Stake2earn = {
  "version": "0.1.0",
  "name": "stake2earn",
  "instructions": [
    {
      "name": "tempTest",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
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
      "name": "setMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
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
      "name": "updateProgramStateOwner",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
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
          "name": "programStateAccountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
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
      "name": "calculateAndDistributeReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dummyNft",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programStateAccountAtaD",
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
      "name": "stakeNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAta",
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
          "name": "userDummyNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAtaD",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAta",
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
          "name": "userDummyNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateAccountAtaD",
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
          "name": "mainStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programState",
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
          "name": "userDummyNftAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programStateAccountRewardTokenAta",
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
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "mainStateId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "mainState",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "currentStakingRound",
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
          },
          {
            "name": "isRewardCalculated",
            "type": "u64"
          },
          {
            "name": "nftsState",
            "type": {
              "array": [
                {
                  "defined": "NftState"
                },
                256
              ]
            }
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftState",
            "type": {
              "vec": {
                "defined": "NftState2"
              }
            }
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
            "name": "rewardRate",
            "type": "u64"
          },
          {
            "name": "totalStakingHours",
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
      "name": "NftState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "dummyNftId",
            "type": "publicKey"
          },
          {
            "name": "nftType",
            "type": "u64"
          },
          {
            "name": "isInStake",
            "type": "u64"
          },
          {
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "claimableRewardAmount",
            "type": "u64"
          },
          {
            "name": "isClaimed",
            "type": "u64"
          },
          {
            "name": "stakedHours",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "NftState2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "dummyNftId",
            "type": "publicKey"
          },
          {
            "name": "nftType",
            "type": "u64"
          },
          {
            "name": "isInStake",
            "type": "u64"
          },
          {
            "name": "stakeInTime",
            "type": "i64"
          },
          {
            "name": "claimableRewardAmount",
            "type": "u64"
          },
          {
            "name": "isClaimed",
            "type": "u64"
          },
          {
            "name": "stakedHours",
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
      "name": "MissMatchMainStateId",
      "msg": "Miss match MainState Id"
    },
    {
      "code": 6003,
      "name": "NotStaked",
      "msg": "Nft haven't staked"
    },
    {
      "code": 6004,
      "name": "StateAlreadyInitialized",
      "msg": "Nft State already initialized"
    },
    {
      "code": 6005,
      "name": "StateNotInitialized",
      "msg": "Nft State not initialized"
    },
    {
      "code": 6006,
      "name": "StakingRoundNotFound",
      "msg": "Newer Staking round not create"
    },
    {
      "code": 6007,
      "name": "AlreadyStaked",
      "msg": "Nft Already Staked"
    },
    {
      "code": 6008,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6009,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6010,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6011,
      "name": "UnknownNft",
      "msg": "Unknown Nft"
    },
    {
      "code": 6012,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6013,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6014,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6015,
      "name": "DummyNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6016,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    },
    {
      "code": 6017,
      "name": "ZeroRewardAmount",
      "msg": "Reward Amount Zero found might be already claimed"
    },
    {
      "code": 6018,
      "name": "StakingDaysAlreadyCalculated",
      "msg": "Staking days already calculated for this account"
    },
    {
      "code": 6019,
      "name": "RewardAlreadyCalculated",
      "msg": "Reward alread Calculated"
    },
    {
      "code": 6020,
      "name": "RewardAlreadyClaimed",
      "msg": "Reward Already claimed"
    },
    {
      "code": 6021,
      "name": "FinalStakingTimeNotCalculated",
      "msg": "Final staking time not calculated"
    },
    {
      "code": 6022,
      "name": "RewardNotCalculated",
      "msg": "Still the Reward not is not calculated by the admin"
    },
    {
      "code": 6023,
      "name": "StakingRoundNotCompleted",
      "msg": "Staking Round Not Completed"
    },
    {
      "code": 6024,
      "name": "RewardCalculationModOn",
      "msg": "Call Lock because of Reward CalCulation Running"
    },
    {
      "code": 6025,
      "name": "RewardCalculationModOff",
      "msg": "Can Run Reward CalCulation if mode not active"
    }
  ]
};
