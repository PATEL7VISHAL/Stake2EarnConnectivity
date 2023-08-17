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
        },
        {
          "name": "oldNftCollectionId",
          "type": "publicKey"
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
            "defined": "StartStakingRoundInput"
          }
        }
      ]
    },
    {
      "name": "endStakingEnd",
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
          "name": "input",
          "type": {
            "defined": "EndStakingRoundInput"
          }
        }
      ]
    },
    {
      "name": "upgradeNft",
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
          "name": "oldNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userOldNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userNewNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateNewNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldNftMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldNftEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldNftCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newNftMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newNftEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
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
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEditionAccount",
          "isMut": true,
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
        },
        {
          "name": "userTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
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
          "isMut": false,
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
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEditionAccount",
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
        },
        {
          "name": "userTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
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
          "name": "userMainNftAta",
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
          },
          {
            "name": "oldNftCollectionId",
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
      "name": "StartStakingRoundInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "roundStartTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "EndStakingRoundInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rewardAmount",
            "type": "u64"
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
      "name": "AlreadyUnStaked",
      "msg": "Nft Already UnStaked"
    },
    {
      "code": 6009,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6010,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6011,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6012,
      "name": "UnknownNft",
      "msg": "Unknown Nft"
    },
    {
      "code": 6013,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6014,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6015,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6016,
      "name": "DummyNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6017,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    },
    {
      "code": 6018,
      "name": "ZeroRewardAmount",
      "msg": "Reward Amount Zero found might be already claimed"
    },
    {
      "code": 6019,
      "name": "StakingDaysAlreadyCalculated",
      "msg": "Staking days already calculated for this account"
    },
    {
      "code": 6020,
      "name": "RewardAlreadyCalculated",
      "msg": "Reward alread Calculated"
    },
    {
      "code": 6021,
      "name": "RewardAlreadyClaimed",
      "msg": "Reward Already claimed"
    },
    {
      "code": 6022,
      "name": "FinalStakingTimeNotCalculated",
      "msg": "Final staking time not calculated"
    },
    {
      "code": 6023,
      "name": "RewardNotCalculated",
      "msg": "Still the Reward not is not calculated by the admin"
    },
    {
      "code": 6024,
      "name": "StakingRoundNotCompleted",
      "msg": "Staking Round Not Completed"
    },
    {
      "code": 6025,
      "name": "RewardCalculationModOn",
      "msg": "Call Lock because of Reward CalCulation Running"
    },
    {
      "code": 6026,
      "name": "RewardCalculationModOff",
      "msg": "Can Run Reward CalCulation if mode not active"
    },
    {
      "code": 6027,
      "name": "NftVerificationFailed",
      "msg": "Nft Verification failed"
    },
    {
      "code": 6028,
      "name": "NftNotFound",
      "msg": "new nft not found in program"
    },
    {
      "code": 6029,
      "name": "NftsIdMissMatch",
      "msg": "Old and New nft id MissMatch"
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
        },
        {
          "name": "oldNftCollectionId",
          "type": "publicKey"
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
            "defined": "StartStakingRoundInput"
          }
        }
      ]
    },
    {
      "name": "endStakingEnd",
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
          "name": "input",
          "type": {
            "defined": "EndStakingRoundInput"
          }
        }
      ]
    },
    {
      "name": "upgradeNft",
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
          "name": "oldNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userOldNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userNewNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateNewNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldNftMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldNftEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldNftCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newNftMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newNftEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
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
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEditionAccount",
          "isMut": true,
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
        },
        {
          "name": "userTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
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
          "isMut": false,
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
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEditionAccount",
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
        },
        {
          "name": "userTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programStateTokenRecordAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
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
          "name": "userMainNftAta",
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
          },
          {
            "name": "oldNftCollectionId",
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
      "name": "StartStakingRoundInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "roundStartTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "EndStakingRoundInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rewardAmount",
            "type": "u64"
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
      "name": "AlreadyUnStaked",
      "msg": "Nft Already UnStaked"
    },
    {
      "code": 6009,
      "name": "StakingTimeNotCompleted",
      "msg": "Staking Time is not Completed"
    },
    {
      "code": 6010,
      "name": "UnknownStakingType",
      "msg": "Unknown Staking Type"
    },
    {
      "code": 6011,
      "name": "MetdataNotFound",
      "msg": "Metdata Not found !"
    },
    {
      "code": 6012,
      "name": "UnknownNft",
      "msg": "Unknown Nft"
    },
    {
      "code": 6013,
      "name": "UnAuthorized",
      "msg": "You don't have authority"
    },
    {
      "code": 6014,
      "name": "NftInStaking",
      "msg": "Nft is in staking"
    },
    {
      "code": 6015,
      "name": "MainNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6016,
      "name": "DummyNftIdMissMatch",
      "msg": "Main Nft id MissMatch"
    },
    {
      "code": 6017,
      "name": "DummyNftRequire",
      "msg": "Dummy Nft is require to unstake nft"
    },
    {
      "code": 6018,
      "name": "ZeroRewardAmount",
      "msg": "Reward Amount Zero found might be already claimed"
    },
    {
      "code": 6019,
      "name": "StakingDaysAlreadyCalculated",
      "msg": "Staking days already calculated for this account"
    },
    {
      "code": 6020,
      "name": "RewardAlreadyCalculated",
      "msg": "Reward alread Calculated"
    },
    {
      "code": 6021,
      "name": "RewardAlreadyClaimed",
      "msg": "Reward Already claimed"
    },
    {
      "code": 6022,
      "name": "FinalStakingTimeNotCalculated",
      "msg": "Final staking time not calculated"
    },
    {
      "code": 6023,
      "name": "RewardNotCalculated",
      "msg": "Still the Reward not is not calculated by the admin"
    },
    {
      "code": 6024,
      "name": "StakingRoundNotCompleted",
      "msg": "Staking Round Not Completed"
    },
    {
      "code": 6025,
      "name": "RewardCalculationModOn",
      "msg": "Call Lock because of Reward CalCulation Running"
    },
    {
      "code": 6026,
      "name": "RewardCalculationModOff",
      "msg": "Can Run Reward CalCulation if mode not active"
    },
    {
      "code": 6027,
      "name": "NftVerificationFailed",
      "msg": "Nft Verification failed"
    },
    {
      "code": 6028,
      "name": "NftNotFound",
      "msg": "new nft not found in program"
    },
    {
      "code": 6029,
      "name": "NftsIdMissMatch",
      "msg": "Old and New nft id MissMatch"
    }
  ]
};
