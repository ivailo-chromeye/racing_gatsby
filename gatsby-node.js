const axios = require("axios");
const _ = require("lodash");
// const fs = require('fs').promises;
// const fromEntries = require('object.fromentries')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const feed = await axios.get(
    "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/feed.json"
  );
  

  const runnersFields =  [
    "start_number", "figures", 
    "horse_uid", "horse_name", "horse_age",
    "jockey_uid", "jockey_name",
    "trainer_id", "trainer_stylename",
    "spotlight",
    "silk_image_path",
  ];

  const response = await axios.get('https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/runners.json');

  let data = {
    bettingForecast: {
      "2159427": {
          "horse_uid": 2159427,
          "horse_name": "Rosa Star",
          "country_origin_code": "USA",
          "start_number": 2,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "2382210": {
          "horse_uid": 2382210,
          "horse_name": "Catsoutofthebag",
          "country_origin_code": "USA",
          "start_number": 3,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3029154": {
          "horse_uid": 3029154,
          "horse_name": "She Fled The Scene",
          "country_origin_code": "USA",
          "start_number": 6,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3029157": {
          "horse_uid": 3029157,
          "horse_name": "Strella's War",
          "country_origin_code": "USA",
          "start_number": 5,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3077249": {
          "horse_uid": 3077249,
          "horse_name": "Jost Sayin",
          "country_origin_code": "USA",
          "start_number": 4,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3086787": {
          "horse_uid": 3086787,
          "horse_name": "Kayseri",
          "country_origin_code": "USA",
          "start_number": 10,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3089450": {
          "horse_uid": 3089450,
          "horse_name": "Aerodynamic",
          "country_origin_code": "USA",
          "start_number": 1,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3089451": {
          "horse_uid": 3089451,
          "horse_name": "Gea",
          "country_origin_code": "CAN",
          "start_number": 7,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3089452": {
          "horse_uid": 3089452,
          "horse_name": "Centsless Drama",
          "country_origin_code": "USA",
          "start_number": 8,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      },
      "3089453": {
          "horse_uid": 3089453,
          "horse_name": "Kisses For Tizzy",
          "country_origin_code": "USA",
          "start_number": 9,
          "forecast_odds_value": null,
          "forecast_odds_desc": null,
          "forecast_odds_style": null
      }
    },
    racecard: {
      "race_instance_title": "Claiming Race (3yo+ Fillies & Mares) (Turf)",
      "race_number": 1,
      "rp_ages_allowed_desc": "3yo+",
      "race_class": null,
      "race_group_code": null,
      "official_rating_band_desc": null,
      "race_datetime": "2020-04-16T18:00:00+01:00",
      "local_meeting_race_datetime": "2020-04-16T13:00:00-04:00",
      "three_yo_min_weight_lbs": null,
      "four_yo_min_weight_lbs": null,
      "minimum_weight_lbs": null,
      "declared_runners": 10,
      "no_of_runners": 10,
      "distance_yard": 1870,
      "distance_furlong_rounded": 8.5,
      "rp_tv_text": "SKY",
      "going_type_desc": "Firm",
      "rp_penalties": null,
      "course_uid": 272,
      "mixed_course_uid": null,
      "course_name": "GULFSTREAM PARK",
      "course_style_name": "Gulfstream Park",
      "course_region": "North America",
      "diffusion_course_name": "GULFSTREAM PARK",
      "course_key": "gulfstream-park",
      "small_map_image_path": null,
      "large_map_image_path": null,
      "rp_horse_types": " ",
      "rp_weights": null,
      "allowances": null,
      "entry_fee": 0,
      "extra_fee": null,
      "country_code": "USA",
      "foreign": 0,
      "rp_stakes": 15789.47,
      "rp_ag_indicator": "G",
      "weights_raised_lbs": null,
      "rp_auction_min": null,
      "rp_claim_min": null,
      "rp_confirmed": 0,
      "race_status_code": "O",
      "race_type_code": "F",
      "race_group_desc": null,
      "going_type_code": "F",
      "no_of_fences": null,
      "no_of_entries": null,
      "rp_stalls_position": null,
      "stalls_position_desc": null,
      "prizes": [
          {
              "position_no": 1,
              "prize_sterling": 9473.68,
              "prize_euro": null,
              "prize_usd": 12600
          },
          {
              "position_no": 2,
              "prize_sterling": 3157.89,
              "prize_euro": null,
              "prize_usd": 4200
          },
          {
              "position_no": 3,
              "prize_sterling": 1578.95,
              "prize_euro": null,
              "prize_usd": 2100
          },
          {
              "position_no": 4,
              "prize_sterling": 947.37,
              "prize_euro": null,
              "prize_usd": 1260
          },
          {
              "position_no": 5,
              "prize_sterling": 631.58,
              "prize_euro": null,
              "prize_usd": 840
          }
      ],
      "other_declarations": null,
      "claiming_prices": null,
      "forfeits": null,
      "forfeit_number": null,
      "forfeit_value": null,
      "stage": null,
      "highest_official_rating": null,
      "scoop6_race": false,
      "lucky7_race": false,
      "jackpot_race": false,
      "william_hill_offer_race": false,
      "ladbrokes_offer_race": false,
      "safety_factor_number": null,
      "early_closing_race": false,
      "reopened": false,
      "division_preference": null,
      "last_year": null,
      "perform_race_uid_atr": null,
      "perform_race_uid_ruk": null,
      "livestream_uid": null,
      "aw_surface_type": null,
      "straight_round_jubilee_code": null,
      "live_tab": false,
      "claiming_race": true,
      "selling_race": false,
      "plus10_race": false,
      "weight_for_age": "3yo from 4yo+ 14lb"
    },
    verdictResponse: {
      "verdict": [
        {
            "race_instance_uid": 755794,
            "race_datetime": "2020-04-16T18:00:00+01:00",
            "rp_verdict": "AERODYNAMIC appeals as the unexposed quantity in the race having her first start in blinkers and for a new barn. She Fled The Scene and Strella's War are others expected to go well.",
            "pre_race_instance_comments": "AERODYNAMIC appeals as the unexposed quantity in the race having her first start in blinkers and for a new barn.",
            "key_stats_str": null,
            "horse_uid": null,
            "horse_name": "",
            "course_uid": 272,
            "course_style_name": "Gulfstream Park",
            "diffusion_course_name": "Gulfstream Park",
            "course_region": "North America",
            "course_country_code": "USA",
            "silk_image_path": null,
            "start_number": null,
            "non_runner": false
        }
        ],
        "spotlight_verdict_selection": {
            "horse_uid": 3089450,
            "horse_name": "Aerodynamic",
            "selection_type_uid": 1,
            "start_number": 1,
            "non_runner": false,
            "silk_image_path": "9/7/6/289679"
        },
        "tipster_verdicts": null
    },
    comments: [
      {
          "horse_name": "Aerodynamic",
          "horse_id": 3089450,
          "spotlight": "Won on her latest outing when 1-2fav at Gulfstream over 1m (good) last month, beating Raspberry Ballet by 3 1/2l. She is wearing blinkers for the first time. Having her first run for a new stable today, previously with Todd Pletcher, and may still have more to offer.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 1,
          "diomed": "Won last time when 1-2fav at Gulfstream over 1m (good) last month, beating Raspberry Ballet by 3 1/2l. Wears blinkers for the first time here. Having her first run for a new stable today, previously with Todd Pletcher, and may still have more to offer."
      },
      {
          "horse_name": "Catsoutofthebag",
          "horse_id": 2382210,
          "spotlight": "A winner at 7f on good ground. Third of 9 behind Capoeira beaten at 11-2 on her latest outing at Tampa Bay Downs over 1m last month. Capable on that form.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 3,
          "diomed": "A winner at 7f on good ground. Third of 9 behind Capoeira beaten at 11-2 on her latest outing at Tampa Bay Downs over 1m last month. Capable on that form."
      },
      {
          "horse_name": "Centsless Drama",
          "horse_id": 3089452,
          "spotlight": "A winner at 1m on good ground. Finished 12l behind Venetian Princess when sixth of 8 at 6-1 on her latest outing at Tampa Bay Downs over 1m (good) in February. Having her first run for a new stable today, previously with Joseph Arboritanza. Others appeal more.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 8,
          "diomed": "A winner at 1m on good ground. Finished 12l behind Venetian Princess when sixth of 8 at 6-1 on her latest outing at Tampa Bay Downs over 1m (good) in February. First run for a new stable today, previously with Joseph Arboritanza. Others appeal more."
      },
      {
          "horse_name": "Gea",
          "horse_id": 3089451,
          "spotlight": "A winner at 1m on good ground. Finished 1 1/2l behind Donder 'n Blitzen when fourth of 9 at 13-2 on her latest outing at Gulfstream over 1m (good) last month. Place claims at best.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 7,
          "diomed": "A winner at 1m on good ground. Finished 1 1/2l behind Donder 'n Blitzen when fourth of 9 at 13-2 on her latest outing at Gulfstream over 1m (good) last month. Place claims at best."
      },
      {
          "horse_name": "Jost Sayin",
          "horse_id": 3077249,
          "spotlight": "A winner at 1m. Beaten a head by Too Much War when second of 9 at 6-5fav on her latest outing at Gulfstream over 1m (good) last month. One to note.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 4,
          "diomed": "A winner at 1m. Beaten a head by Too Much War when second of 9 at 6-5fav on her latest outing at Gulfstream over 1m (good) last month. One to note."
      },
      {
          "horse_name": "Kayseri",
          "horse_id": 3086787,
          "spotlight": "A winner at 7-2 at Gulfstream over 1m (good) on her latest outing last month, beating Madame Moon by 3/4l. Needs more in this company.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 10,
          "diomed": "A winner at 7-2 at Gulfstream over 1m (good) on her latest outing last month, beating Madame Moon by 3/4l. Needs more in this company."
      },
      {
          "horse_name": "Kisses For Tizzy",
          "horse_id": 3089453,
          "spotlight": "A winner at 1m on good ground. Beaten 13l behind Yolanda's Pride at 45-1 when 10th of 11 on her latest outing at Gulfstream over 1m (good) last month. Look elsewhere.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 9,
          "diomed": "A winner at 1m on good ground. Beaten 13l behind Yolanda's Pride at 45-1 when 10th of 11 on her latest outing at Gulfstream over 1m (good) last month. Look elsewhere."
      },
      {
          "horse_name": "Rosa Star",
          "horse_id": 2159427,
          "spotlight": "A winner at 7f on good ground. Finished 4l behind Too Much War when fourth of 9 at 8-1 on her latest outing at Gulfstream over 1m (good) last month. Not today.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 2,
          "diomed": "A winner at 7f on good ground. Finished 4l behind Too Much War when fourth of 9 at 8-1 on her latest outing at Gulfstream over 1m (good) last month. Not today."
      },
      {
          "horse_name": "She Fled The Scene",
          "horse_id": 3029154,
          "spotlight": "A winner at 7f on good ground. Finished 3 1/2l behind Big Tina when fourth of 9 at 15-2 on her latest outing at Gulfstream over 1m (good) last month. Cannot go unconsidered.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 6,
          "diomed": "A winner at 7f on good ground. Finished 3 1/2l behind Big Tina when fourth of 9 at 15-2 on her latest outing at Gulfstream over 1m (good) last month. Cannot go unconsidered."
      },
      {
          "horse_name": "Strella's War",
          "horse_id": 3029157,
          "spotlight": "A winner at 1m on good ground. Third of 7 behind So Charming beaten at 3-1 on her latest outing at Gulfstream over 1m (good) last month. Must be respected.",
          "race_datetime": "2020-04-16T18:00:00+01:00",
          "alt_silk_code": null,
          "saddle_cloth_no": 5,
          "diomed": "A winner at 1m on good ground. Third of 7 behind So Charming beaten at 3-1 on her latest outing at Gulfstream over 1m (good) last month. Must be respected."
      }
    ],
    resultsResponse: {
      "race_info": {
        "race_status_code": "R",
        "race_datetime": "2020-04-15T11:45:00+01:00",
        "race_start_datetime": "2020-04-15T00:00:00+01:00",
        "local_meeting_race_datetime": "2020-04-15T18:45:00+08:00",
        "race_instance_title": "Walnut Handicap (Class 5) (3yo+) (Course C) (Turf)",
        "race_type_code": "F",
        "race_surface": null,
        "distance_yard": 1815,
        "distance_furlong_rounded": 8.5,
        "race_group_desc": "Handicap",
        "race_class": null,
        "no_of_fences": null,
        "ages_allowed_desc": "3yo+",
        "official_rating_band_desc": null,
        "straight_round_jubilee_code": null,
        "straight_round_jubilee_desc": null,
        "rp_straight_round_jubilee_desc": null,
        "course_uid": 396,
        "course_name": "HAPPY VALLEY",
        "diffusion_course_name": "HAPPY VALLEY",
        "course_key": "happy-valley",
        "course_style_name": "Happy Valley",
        "course_country_code": "HK",
        "course_country_desc": "Hong Kong",
        "course_region": "Asia",
        "meeting_name": null,
        "meeting_date": "2020-04-15T00:00:00+01:00",
        "meeting_abandoned": "N",
        "abandoned_reason": null,
        "meeting_going_desc": "TURF: GOOD",
        "going_type_code": "G",
        "going_type_desc": "Good",
        "race_comments": "Also eligible: 13, 14. Dead heat 2nd.",
        "omitted_fences": 0,
        "start_flag": false,
        "stalls_position": null,
        "misc_text": null,
        "rails": null,
        "wind": null,
        "rp_analysis": null,
        "prizes": [
            {
                "prize_sterling": 39966.15,
                "prize_euro": null,
                "prize_euro_gross": null,
                "prize_usd": 53154.98,
                "position_no": 1
            },
            {
                "prize_sterling": 11744.39,
                "prize_euro": null,
                "prize_euro_gross": null,
                "prize_usd": 15620.04,
                "position_no": 2
            },
            {
                "prize_sterling": 8063.35,
                "prize_euro": null,
                "prize_euro_gross": null,
                "prize_usd": 10724.25,
                "position_no": 3
            },
            {
                "prize_sterling": 4206.96,
                "prize_euro": null,
                "prize_euro_gross": null,
                "prize_usd": 5595.26,
                "position_no": 4
            },
            {
                "prize_sterling": 2454.06,
                "prize_euro": null,
                "prize_euro_gross": null,
                "prize_usd": 3263.9,
                "position_no": 5
            }
        ],
        "eyecatcher": {
            "horse_uid": null,
            "horse_name": "",
            "notes": null
        },
        "star_performer": {
            "horse_uid": null,
            "horse_name": "",
            "notes": null
        },
        "tote": {
            "tote_deadheat_text": "PARI-MUTUEL (all including 10 hkd stake): WIN 75.00; PLACE 31.50, 37.50 (Nitro Express), 61.50 (V Chevaliers); DF 320.00 (Nitro Express), 396.00 (V Chevaliers)",
            "tote_win_money": null,
            "tote_place_1_Money": null,
            "tote_place_2_Money": null,
            "tote_place_3_Money": null,
            "tote_place_4_Money": null,
            "tote_dual_forecast_money": null,
            "computer_strght_frcst_money": null,
            "tricast_money": null,
            "tote_trio_money": null,
            "trio_text": " ",
            "rule_4_Text": null,
            "selling_details_text": null,
            "jackpot_text": null,
            "placepot_text": null,
            "quadpot_text": null
        },
        "dividends": {
            "aggregate_sp": 6.5,
            "favorites_index": 0,
            "winning_distances": 0.1,
            "double_cards": 12,
            "betting_man": null,
            "analysis_man": null,
            "close_up_man": null
        },
        "video_detail": [
            {
                "ptv_video_id": 625099,
                "video_provider": "ATR",
                "complete_race_uid": 625099,
                "complete_race_start": 0,
                "complete_race_end": 1,
                "finish_race_uid": 625099,
                "finish_race_start": 0,
                "finish_race_end": 1,
                "stream_url": null
            }
        ],
        "aw_surface_type": null
      },
      "non_runners": [
        {
            "horse_uid": 1944331,
            "horse_name": "Keep Going",
            "horse_country_origin_code": "AUS",
            "horse_age": 5,
            "sire_name": "Testa Rossa",
            "sire_country": "AUS",
            "first_season_sire_id": null,
            "weight_carried_lbs": 113,
            "jockey_style_name": null,
            "trainer_style_name": "Y S Tsui",
            "owner_group_uid": null,
            "rp_close_up_comment": null
        },
        {
            "horse_uid": 1013824,
            "horse_name": "The Joy Of Giving",
            "horse_country_origin_code": "IRE",
            "horse_age": 6,
            "sire_name": "Thewayyouare",
            "sire_country": "USA",
            "first_season_sire_id": null,
            "weight_carried_lbs": 130,
            "jockey_style_name": null,
            "trainer_style_name": "C W Chang",
            "owner_group_uid": null,
            "rp_close_up_comment": null
        }
      ],
      "statistic": {
          "total_sp": 123.48352384090923,
          "number_of_runners": 12,
          "winner_time": 99.92,
          "diff_to_standard_time_sec": 1.92,
          "average_time_sec": 98
      },
      "result": [
        {
            "horse_uid": 1750314,
            "horse_style_name": "Humble Steed",
            "horse_country_origin_code": "IRE",
            "horse_age": 6,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 6,
            "draw": 3,
            "horse_head_gear": null,
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 126,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 1,
            "race_outcome_code": "1",
            "race_outcome_desc": "1st",
            "race_outcome_joint": false,
            "race_output_order": 1,
            "disqualification_uid": null,
            "race_outcome_uid": 1,
            "final_race_outcome_uid": 1,
            "starting_price_odds_uid": 12,
            "rp_betting_movements": "",
            "odds_desc": "13/2",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": null,
            "distance_to_winner": null,
            "dist_to_horse_in_front_uid": null,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 33,
            "jockey_uid": 88634,
            "jockey_style_name": "Karis Teetan",
            "jockey_aka_style_name": "K Teetan",
            "weight_allowance_lbs": 0,
            "trainer_uid": 30441,
            "trainer_style_name": "T P Yung",
            "trainer_mirror_name": "T Yung",
            "owner_uid": 256515,
            "owner_style_name": "Choi Wong Ling Ling, Choi Kam Shan & Elina Choi Chun Ni",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/5/1/5/256515.png",
            "breeder_style_name": "Patrick Cassidy",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 582877,
                "horse_name": "Kodiac",
                "horse_country_origin_code": "GB",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": 7.1,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 597355,
                "horse_name": "Singitta",
                "horse_country_origin_code": "GB",
                "sire": {
                    "horse_uid": 97591,
                    "horse_name": "Singspiel",
                    "horse_country_origin_code": "IRE",
                    "avg_flat_win_dist_of_progeny": 7.1,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 44610,
                    "dam_uid": 414287
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 754889,
                "course_uid": 416,
                "course_key": "sha-tin",
                "diffusion_course_name": "SHA TIN",
                "race_datetime": "2020-03-29T05:45:00+01:00"
            },
            "silk_image_path": "5/1/5/256515",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 1121535,
            "horse_style_name": "Nitro Express",
            "horse_country_origin_code": "AUS",
            "horse_age": 8,
            "horse_sex_code": "G",
            "horse_colour_code": "BB",
            "saddle_cloth_no": 3,
            "draw": 9,
            "horse_head_gear": "tb",
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 132,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 2,
            "race_outcome_code": "2",
            "race_outcome_desc": "2nd",
            "race_outcome_joint": false,
            "race_output_order": 2,
            "disqualification_uid": null,
            "race_outcome_uid": 2,
            "final_race_outcome_uid": 2,
            "starting_price_odds_uid": 82,
            "rp_betting_movements": "",
            "odds_desc": "13/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "shd",
            "distance_to_winner": 0.1,
            "dist_to_horse_in_front_uid": 2,
            "distance_to_winner_uid": 1,
            "official_rating_ran_off": 39,
            "jockey_uid": 13699,
            "jockey_style_name": "Neil Callan",
            "jockey_aka_style_name": "N Callan",
            "weight_allowance_lbs": 0,
            "trainer_uid": 11050,
            "trainer_style_name": "D E Ferraris",
            "trainer_mirror_name": "D Ferraris",
            "owner_uid": 200707,
            "owner_style_name": "Chow Chu May Ping",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/7/0/7/200707.png",
            "breeder_style_name": "Patinack Farm",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b/br",
            "sire": {
                "horse_uid": 652749,
                "horse_name": "Nadeem",
                "horse_country_origin_code": "AUS",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 1121534,
                "horse_name": "Princess Laya",
                "horse_country_origin_code": "AUS",
                "sire": {
                    "horse_uid": 455703,
                    "horse_name": "Encosta De Lago",
                    "horse_country_origin_code": "AUS",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 300775,
                    "dam_uid": 668811
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 753363,
                "course_uid": 396,
                "course_key": "happy-valley",
                "diffusion_course_name": "HAPPY VALLEY",
                "race_datetime": "2020-03-11T13:45:00+00:00"
            },
            "silk_image_path": "7/0/7/200707",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 2677071,
            "horse_style_name": "V Chevaliers",
            "horse_country_origin_code": "NZ",
            "horse_age": 5,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 4,
            "draw": 6,
            "horse_head_gear": null,
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 131,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 2,
            "race_outcome_code": "2",
            "race_outcome_desc": "2nd",
            "race_outcome_joint": false,
            "race_output_order": 2,
            "disqualification_uid": null,
            "race_outcome_uid": 2,
            "final_race_outcome_uid": 2,
            "starting_price_odds_uid": 95,
            "rp_betting_movements": "",
            "odds_desc": "18/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "dht",
            "distance_to_winner": 0.1,
            "dist_to_horse_in_front_uid": 1,
            "distance_to_winner_uid": 1,
            "official_rating_ran_off": 38,
            "jockey_uid": 91402,
            "jockey_style_name": "Chad Schofield",
            "jockey_aka_style_name": "C Schofield",
            "weight_allowance_lbs": 0,
            "trainer_uid": 12760,
            "trainer_style_name": "L Ho",
            "trainer_mirror_name": "L Ho",
            "owner_uid": 276572,
            "owner_style_name": "Musketeers Fraternity Syndicate",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/2/7/5/276572.png",
            "breeder_style_name": "A W, Mrs V A & W K Pike",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 801155,
                "horse_name": "Ocean Park",
                "horse_country_origin_code": "NZ",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 986345,
                "horse_name": "Screen Siren",
                "horse_country_origin_code": "NZ",
                "sire": {
                    "horse_uid": 503034,
                    "horse_name": "Montjeu",
                    "horse_country_origin_code": "IRE",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 463975,
                    "dam_uid": 44559
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 753227,
                "course_uid": 416,
                "course_key": "sha-tin",
                "diffusion_course_name": "SHA TIN",
                "race_datetime": "2020-03-08T06:30:00+00:00"
            },
            "silk_image_path": "2/7/5/276572",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 2693856,
            "horse_style_name": "Galaxy Racer",
            "horse_country_origin_code": "NZ",
            "horse_age": 4,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 1,
            "draw": 7,
            "horse_head_gear": "b",
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 133,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 4,
            "race_outcome_code": "4",
            "race_outcome_desc": "4th",
            "race_outcome_joint": false,
            "race_output_order": 4,
            "disqualification_uid": null,
            "race_outcome_uid": 4,
            "final_race_outcome_uid": 4,
            "starting_price_odds_uid": 631,
            "rp_betting_movements": "",
            "odds_desc": "16/5",
            "2nd_fav": true,
            "joint_2nd_fav": false,
            "rp_distance_desc": "2 3/4",
            "distance_to_winner": 2.85,
            "dist_to_horse_in_front_uid": 35,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 40,
            "jockey_uid": 84921,
            "jockey_style_name": "Joao Moreira",
            "jockey_aka_style_name": "J Moreira",
            "weight_allowance_lbs": 0,
            "trainer_uid": 16095,
            "trainer_style_name": "C Fownes",
            "trainer_mirror_name": "C Fownes",
            "owner_uid": 277160,
            "owner_style_name": "Simon Wong Wai Hung",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/0/6/1/277160.png",
            "breeder_style_name": "Pee Gee & W J Bloodstock Ltd",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 674931,
                "horse_name": "Alamosa",
                "horse_country_origin_code": "NZ",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 2693855,
                "horse_name": "Priorite",
                "horse_country_origin_code": "NZ",
                "sire": {
                    "horse_uid": 460016,
                    "horse_name": "Zabeel",
                    "horse_country_origin_code": "NZ",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 302290,
                    "dam_uid": 618875
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 754621,
                "course_uid": 396,
                "course_key": "happy-valley",
                "diffusion_course_name": "HAPPY VALLEY",
                "race_datetime": "2020-03-25T11:15:00+00:00"
            },
            "silk_image_path": "0/6/1/277160",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 894570,
            "horse_style_name": "The Full Bloom",
            "horse_country_origin_code": "GB",
            "horse_age": 7,
            "horse_sex_code": "G",
            "horse_colour_code": "RG",
            "saddle_cloth_no": 7,
            "draw": 10,
            "horse_head_gear": "t",
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 121,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 5,
            "race_outcome_code": "5",
            "race_outcome_desc": "5th",
            "race_outcome_joint": false,
            "race_output_order": 5,
            "disqualification_uid": null,
            "race_outcome_uid": 5,
            "final_race_outcome_uid": 5,
            "starting_price_odds_uid": 369,
            "rp_betting_movements": "",
            "odds_desc": "19/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "shd",
            "distance_to_winner": 2.95,
            "dist_to_horse_in_front_uid": 2,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 30,
            "jockey_uid": 95725,
            "jockey_style_name": "Matthew Poon",
            "jockey_aka_style_name": "M Poon",
            "weight_allowance_lbs": 2,
            "trainer_uid": 15856,
            "trainer_style_name": "C H Yip",
            "trainer_mirror_name": "C Yip",
            "owner_uid": 242359,
            "owner_style_name": "Gary Lee Sai Ho",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/9/5/3/242359.png",
            "breeder_style_name": "D R Botterill",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "gr/ro",
            "sire": {
                "horse_uid": 749764,
                "horse_name": "Zebedee",
                "horse_country_origin_code": "GB",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": 6.6,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 703845,
                "horse_name": "Break Of Dawn",
                "horse_country_origin_code": "USA",
                "sire": {
                    "horse_uid": 460776,
                    "horse_name": "Mt. Livermore",
                    "horse_country_origin_code": "USA",
                    "avg_flat_win_dist_of_progeny": 6.6,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 303373,
                    "dam_uid": 442844
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 755011,
                "course_uid": 416,
                "course_key": "sha-tin",
                "diffusion_course_name": "SHA TIN",
                "race_datetime": "2020-04-01T13:15:00+01:00"
            },
            "silk_image_path": "9/5/3/242359",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 1927359,
            "horse_style_name": "Rockage",
            "horse_country_origin_code": "IRE",
            "horse_age": 5,
            "horse_sex_code": "G",
            "horse_colour_code": "CH",
            "saddle_cloth_no": 12,
            "draw": 11,
            "horse_head_gear": "tb",
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 114,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 1,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 6,
            "race_outcome_code": "6",
            "race_outcome_desc": "6th",
            "race_outcome_joint": false,
            "race_output_order": 6,
            "disqualification_uid": null,
            "race_outcome_uid": 6,
            "final_race_outcome_uid": 6,
            "starting_price_odds_uid": 174,
            "rp_betting_movements": "",
            "odds_desc": "30/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "1/2",
            "distance_to_winner": 3.45,
            "dist_to_horse_in_front_uid": 5,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 16,
            "jockey_uid": 91255,
            "jockey_style_name": "V Borges",
            "jockey_aka_style_name": "V Borges",
            "weight_allowance_lbs": 0,
            "trainer_uid": 12762,
            "trainer_style_name": "K W Lui",
            "trainer_mirror_name": "K Lui",
            "owner_uid": 261590,
            "owner_style_name": "Mr & Mrs Stephen Ho Wai Man, F Ho Ka Chun & D Ho Ka Chung",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/0/9/5/261590.png",
            "breeder_style_name": "The Box Of Frogs Syndicate (ire)",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "ch",
            "sire": {
                "horse_uid": 738816,
                "horse_name": "Society Rock",
                "horse_country_origin_code": "IRE",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": 6.9,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 758023,
                "horse_name": "Box Of Frogs",
                "horse_country_origin_code": "IRE",
                "sire": {
                    "horse_uid": 578657,
                    "horse_name": "One Cool Cat",
                    "horse_country_origin_code": "USA",
                    "avg_flat_win_dist_of_progeny": 6.9,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 304247,
                    "dam_uid": 573129
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 752870,
                "course_uid": 416,
                "course_key": "sha-tin",
                "diffusion_course_name": "SHA TIN",
                "race_datetime": "2020-03-01T04:45:00+00:00"
            },
            "silk_image_path": "0/9/5/261590",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 2289802,
            "horse_style_name": "Virtus Star",
            "horse_country_origin_code": "AUS",
            "horse_age": 4,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 10,
            "draw": 12,
            "horse_head_gear": null,
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 120,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 7,
            "race_outcome_code": "7",
            "race_outcome_desc": "7th",
            "race_outcome_joint": false,
            "race_output_order": 7,
            "disqualification_uid": null,
            "race_outcome_uid": 7,
            "final_race_outcome_uid": 7,
            "starting_price_odds_uid": 467,
            "rp_betting_movements": "",
            "odds_desc": "27/10F",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "shd",
            "distance_to_winner": 3.55,
            "dist_to_horse_in_front_uid": 2,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 27,
            "jockey_uid": 82339,
            "jockey_style_name": "Zac Purton",
            "jockey_aka_style_name": "Z Purton",
            "weight_allowance_lbs": 0,
            "trainer_uid": 33689,
            "trainer_style_name": "F C Lor",
            "trainer_mirror_name": "F Lor",
            "owner_uid": 268493,
            "owner_style_name": "HKUAA Syndicate",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/3/9/4/268493.png",
            "breeder_style_name": "D P Bentata",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 704777,
                "horse_name": "Sebring",
                "horse_country_origin_code": "AUS",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 2018808,
                "horse_name": "Princess Natural",
                "horse_country_origin_code": "AUS",
                "sire": {
                    "horse_uid": 104011,
                    "horse_name": "Danehill Dancer",
                    "horse_country_origin_code": "IRE",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 42373,
                    "dam_uid": 49465
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 754621,
                "course_uid": 396,
                "course_key": "happy-valley",
                "diffusion_course_name": "HAPPY VALLEY",
                "race_datetime": "2020-03-25T11:15:00+00:00"
            },
            "silk_image_path": "3/9/4/268493",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 2348620,
            "horse_style_name": "Mischievous Sundae",
            "horse_country_origin_code": "AUS",
            "horse_age": 4,
            "horse_sex_code": "G",
            "horse_colour_code": "BL",
            "saddle_cloth_no": 9,
            "draw": 2,
            "horse_head_gear": "e/s",
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 121,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 8,
            "race_outcome_code": "8",
            "race_outcome_desc": "8th",
            "race_outcome_joint": false,
            "race_output_order": 8,
            "disqualification_uid": null,
            "race_outcome_uid": 8,
            "final_race_outcome_uid": 8,
            "starting_price_odds_uid": 48,
            "rp_betting_movements": "",
            "odds_desc": "11/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "1 1/4",
            "distance_to_winner": 4.8,
            "dist_to_horse_in_front_uid": 32,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 28,
            "jockey_uid": 90687,
            "jockey_style_name": "C Y Ho",
            "jockey_aka_style_name": "C Y Ho",
            "weight_allowance_lbs": 0,
            "trainer_uid": 12739,
            "trainer_style_name": "J Size",
            "trainer_mirror_name": "J Size",
            "owner_uid": 215302,
            "owner_style_name": "Equus Syndicate",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/2/0/3/215302.png",
            "breeder_style_name": "Wallings Bloodstock Pty Ltd",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "bl",
            "sire": {
                "horse_uid": 704777,
                "horse_name": "Sebring",
                "horse_country_origin_code": "AUS",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 810365,
                "horse_name": "Elsewhere",
                "horse_country_origin_code": "AUS",
                "sire": {
                    "horse_uid": 542432,
                    "horse_name": "Lonhro",
                    "horse_country_origin_code": "AUS",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 455714,
                    "dam_uid": 542423
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 755011,
                "course_uid": 416,
                "course_key": "sha-tin",
                "diffusion_course_name": "SHA TIN",
                "race_datetime": "2020-04-01T13:15:00+01:00"
            },
            "silk_image_path": "2/0/3/215302",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 1179374,
            "horse_style_name": "Starlot",
            "horse_country_origin_code": "AUS",
            "horse_age": 6,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 5,
            "draw": 4,
            "horse_head_gear": "b",
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 128,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 9,
            "race_outcome_code": "9",
            "race_outcome_desc": "9th",
            "race_outcome_joint": false,
            "race_output_order": 9,
            "disqualification_uid": null,
            "race_outcome_uid": 9,
            "final_race_outcome_uid": 9,
            "starting_price_odds_uid": 1,
            "rp_betting_movements": "",
            "odds_desc": "14/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "1 1/2",
            "distance_to_winner": 6.3,
            "dist_to_horse_in_front_uid": 8,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 35,
            "jockey_uid": 88536,
            "jockey_style_name": "K C Leung",
            "jockey_aka_style_name": "K Leung",
            "weight_allowance_lbs": 0,
            "trainer_uid": 30862,
            "trainer_style_name": "P O'Sullivan",
            "trainer_mirror_name": "P O'Sullivan",
            "owner_uid": 244156,
            "owner_style_name": "HK Football Club Horse Racing Syndicate",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/6/5/1/244156.png",
            "breeder_style_name": "Laing Racing Syndicate",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 751815,
                "horse_name": "Star Witness",
                "horse_country_origin_code": "AUS",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 729580,
                "horse_name": "Pearl Of The Sea",
                "horse_country_origin_code": "AUS",
                "sire": {
                    "horse_uid": 596550,
                    "horse_name": "Fastnet Rock",
                    "horse_country_origin_code": "AUS",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 42373,
                    "dam_uid": 484285
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 753358,
                "course_uid": 396,
                "course_key": "happy-valley",
                "diffusion_course_name": "HAPPY VALLEY",
                "race_datetime": "2020-03-11T11:15:00+00:00"
            },
            "silk_image_path": "6/5/1/244156",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 2402358,
            "horse_style_name": "Charitydream",
            "horse_country_origin_code": "GB",
            "horse_age": 5,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 11,
            "draw": 1,
            "horse_head_gear": null,
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 112,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 10,
            "race_outcome_code": "10",
            "race_outcome_desc": "10th",
            "race_outcome_joint": false,
            "race_output_order": 10,
            "disqualification_uid": null,
            "race_outcome_uid": 10,
            "final_race_outcome_uid": 10,
            "starting_price_odds_uid": 7,
            "rp_betting_movements": "",
            "odds_desc": "10/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "2 1/4",
            "distance_to_winner": 8.55,
            "dist_to_horse_in_front_uid": 34,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 24,
            "jockey_uid": 96944,
            "jockey_style_name": "C Victor Wong",
            "jockey_aka_style_name": "C V Wong",
            "weight_allowance_lbs": 5,
            "trainer_uid": 28673,
            "trainer_style_name": "W Y So",
            "trainer_mirror_name": "W So",
            "owner_uid": 270740,
            "owner_style_name": "Yuk Yat Syndicate",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/0/4/7/270740.png",
            "breeder_style_name": "Eminent Kind Ltd",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 565797,
                "horse_name": "Oasis Dream",
                "horse_country_origin_code": "GB",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": 7.6,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 425464,
                "horse_name": "Morzine",
                "horse_country_origin_code": "GB",
                "sire": {
                    "horse_uid": 301555,
                    "horse_name": "Miswaki",
                    "horse_country_origin_code": "USA",
                    "avg_flat_win_dist_of_progeny": 7.6,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 301599,
                    "dam_uid": 416638
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 755011,
                "course_uid": 416,
                "course_key": "sha-tin",
                "diffusion_course_name": "SHA TIN",
                "race_datetime": "2020-04-01T13:15:00+01:00"
            },
            "silk_image_path": "0/4/7/270740",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 1919135,
            "horse_style_name": "Gloriam",
            "horse_country_origin_code": "AUS",
            "horse_age": 5,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 8,
            "draw": 5,
            "horse_head_gear": null,
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 119,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 11,
            "race_outcome_code": "11",
            "race_outcome_desc": "11th",
            "race_outcome_joint": false,
            "race_output_order": 11,
            "disqualification_uid": null,
            "race_outcome_uid": 11,
            "final_race_outcome_uid": 11,
            "starting_price_odds_uid": 7,
            "rp_betting_movements": "",
            "odds_desc": "10/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "3",
            "distance_to_winner": 11.55,
            "dist_to_horse_in_front_uid": 11,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 28,
            "jockey_uid": 89197,
            "jockey_style_name": "T H So",
            "jockey_aka_style_name": "T So",
            "weight_allowance_lbs": 2,
            "trainer_uid": 13936,
            "trainer_style_name": "P F Yiu",
            "trainer_mirror_name": "P Yiu",
            "owner_uid": 261426,
            "owner_style_name": "Dr Jimmy Wong Chi Ho",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/6/2/4/261426.png",
            "breeder_style_name": "Harvey",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 486733,
                "horse_name": "Mossman",
                "horse_country_origin_code": "AUS",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 898393,
                "horse_name": "Fromage",
                "horse_country_origin_code": "AUS",
                "sire": {
                    "horse_uid": 510321,
                    "horse_name": "Flying Spur",
                    "horse_country_origin_code": "AUS",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 42373,
                    "dam_uid": 566177
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 754889,
                "course_uid": 416,
                "course_key": "sha-tin",
                "diffusion_course_name": "SHA TIN",
                "race_datetime": "2020-03-29T05:45:00+01:00"
            },
            "silk_image_path": "6/2/4/261426",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        },
        {
            "horse_uid": 2444318,
            "horse_style_name": "Break Record",
            "horse_country_origin_code": "AUS",
            "horse_age": 4,
            "horse_sex_code": "G",
            "horse_colour_code": "B",
            "saddle_cloth_no": 2,
            "draw": 8,
            "horse_head_gear": "tp",
            "first_time_headgear": false,
            "wind_surgery_first_time": false,
            "wind_surgery_second_time": false,
            "weight_carried_lbs": 132,
            "extra_weight_lbs": 0,
            "over_weight_lbs": 0,
            "out_of_handicap_lbs": null,
            "race_outcome_position": 12,
            "race_outcome_code": "12",
            "race_outcome_desc": "12th",
            "race_outcome_joint": false,
            "race_output_order": 12,
            "disqualification_uid": null,
            "race_outcome_uid": 12,
            "final_race_outcome_uid": 12,
            "starting_price_odds_uid": 369,
            "rp_betting_movements": "",
            "odds_desc": "19/1",
            "2nd_fav": false,
            "joint_2nd_fav": false,
            "rp_distance_desc": "4 1/2",
            "distance_to_winner": 16.05,
            "dist_to_horse_in_front_uid": 70,
            "distance_to_winner_uid": null,
            "official_rating_ran_off": 39,
            "jockey_uid": 88642,
            "jockey_style_name": "Antoine Hamelin",
            "jockey_aka_style_name": "A Hamelin",
            "weight_allowance_lbs": 0,
            "trainer_uid": 16058,
            "trainer_style_name": "C S Shum",
            "trainer_mirror_name": "C Shum",
            "owner_uid": 271594,
            "owner_style_name": "Cheng Miu Chung",
            "rp_owner_choice": null,
            "silk_image_png": "//images.racingpost.com/png_silks/4/9/5/271594.png",
            "breeder_style_name": "Bangaloe Stud Syndicate",
            "rp_close_up_comment": null,
            "rp_postmark": 0,
            "rp_topspeed": null,
            "ages_allowed_desc": "3yo+",
            "rp_newspaper_output_desc": "b",
            "sire": {
                "horse_uid": 655411,
                "horse_name": "Casino Prince",
                "horse_country_origin_code": "AUS",
                "first_season_sire_id": null,
                "avg_flat_win_dist_of_progeny": null,
                "avg_jump_win_dist_of_progeny": null
            },
            "dam": {
                "horse_uid": 2444317,
                "horse_name": "Bella Laguna",
                "horse_country_origin_code": "AUS",
                "sire": {
                    "horse_uid": 455703,
                    "horse_name": "Encosta De Lago",
                    "horse_country_origin_code": "AUS",
                    "avg_flat_win_dist_of_progeny": null,
                    "avg_jump_win_dist_of_progeny": null,
                    "sire_uid": 300775,
                    "dam_uid": 668811
                }
            },
            "next_race": null,
            "prev_race": {
                "race_instance_uid": 753358,
                "course_uid": 396,
                "course_key": "happy-valley",
                "diffusion_course_name": "HAPPY VALLEY",
                "race_datetime": "2020-03-11T11:15:00+00:00"
            },
            "silk_image_path": "4/9/5/271594",
            "wfa_adjustment": 0,
            "owner_group_uid": null
        }
      ],
      "next_race_id": null,
      "prev_race_id": null,
      "first_race_id": null,
      "last_race_id": null,
      "draw_bias_index": null,
      "next_run": null
    },
    official_rating: {
      "race_details": {
          "race_date": "2020-04-16T18:00:00+01:00",
          "race_type_code": "F",
          "race_status_code": "O",
          "race_group_code": "0"
      },
      "runners": {
          "2159427": {
              "horse_uid": 2159427,
              "horse_name": "Rosa Star",
              "weight_carried_lbs": 125,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 94074,
              "saddle_cloth_no": 2,
              "last_races": [
                  {
                      "race_instance_uid": 754688,
                      "race_datetime": "2020-03-26T20:36:00+00:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 272,
                      "course_name": "GULFSTREAM PARK",
                      "course_style_name": "Gulfstream Park",
                      "diffusion_course_name": "GULFSTREAM PARK",
                      "course_key": "gulfstream-park",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Fm",
                      "race_outcome_code": "4",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 9,
                      "official_rating": 0,
                      "race_group_code": "0"
                  },
                  {
                      "race_instance_uid": 710516,
                      "race_datetime": "2018-08-26T21:09:00+01:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 276,
                      "course_name": "ARLINGTON PARK",
                      "course_style_name": "Arlington Park",
                      "diffusion_course_name": "ARLINGTON PARK",
                      "course_key": "arlington-park",
                      "course_country": "USA",
                      "distance_yard": 1100,
                      "distance_furlong_rounded": 5,
                      "services_desc": "Sft",
                      "race_outcome_code": "2",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 6,
                      "official_rating": 0,
                      "race_group_code": "0"
                  },
                  {
                      "race_instance_uid": 709524,
                      "race_datetime": "2018-08-16T22:18:00+01:00",
                      "race_type_code": "X",
                      "rp_postmark": null,
                      "course_uid": 276,
                      "course_name": "ARLINGTON PARK",
                      "course_style_name": "Arlington Park",
                      "diffusion_course_name": "ARLINGTON PARK",
                      "course_key": "arlington-park",
                      "course_country": "USA",
                      "distance_yard": 1870,
                      "distance_furlong_rounded": 8.5,
                      "services_desc": "Fs",
                      "race_outcome_code": "4",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 7,
                      "official_rating": 0,
                      "race_group_code": "0"
                  }
              ],
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "2382210": {
              "horse_uid": 2382210,
              "horse_name": "Catsoutofthebag",
              "weight_carried_lbs": 125,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 87585,
              "saddle_cloth_no": 3,
              "last_races": [
                  {
                      "race_instance_uid": 723693,
                      "race_datetime": "2019-02-24T18:28:00+00:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 272,
                      "course_name": "GULFSTREAM PARK",
                      "course_style_name": "Gulfstream Park",
                      "diffusion_course_name": "GULFSTREAM PARK",
                      "course_key": "gulfstream-park",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Fm",
                      "race_outcome_code": "4",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 6,
                      "official_rating": 0,
                      "race_group_code": "0"
                  },
                  {
                      "race_instance_uid": 722654,
                      "race_datetime": "2019-02-10T21:17:00+00:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 724,
                      "course_name": "TAMPA BAY DOWNS",
                      "course_style_name": "Tampa Bay Downs",
                      "diffusion_course_name": "TAMPA BAY DOWNS",
                      "course_key": "tampa-bay-downs",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Gd",
                      "race_outcome_code": "10",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 10,
                      "official_rating": 0,
                      "race_group_code": "0"
                  }
              ],
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3029154": {
              "horse_uid": 3029154,
              "horse_name": "She Fled The Scene",
              "weight_carried_lbs": 125,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 92812,
              "saddle_cloth_no": 6,
              "last_races": [
                  {
                      "race_instance_uid": 754961,
                      "race_datetime": "2020-03-29T20:03:00+01:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 272,
                      "course_name": "GULFSTREAM PARK",
                      "course_style_name": "Gulfstream Park",
                      "diffusion_course_name": "GULFSTREAM PARK",
                      "course_key": "gulfstream-park",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Fm",
                      "race_outcome_code": "4",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 9,
                      "official_rating": 0,
                      "race_group_code": "0"
                  },
                  {
                      "race_instance_uid": 751239,
                      "race_datetime": "2020-02-14T21:03:00+00:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 272,
                      "course_name": "GULFSTREAM PARK",
                      "course_style_name": "Gulfstream Park",
                      "diffusion_course_name": "GULFSTREAM PARK",
                      "course_key": "gulfstream-park",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Fm",
                      "race_outcome_code": "6",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 8,
                      "official_rating": 0,
                      "race_group_code": "0"
                  }
              ],
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3029157": {
              "horse_uid": 3029157,
              "horse_name": "Strella's War",
              "weight_carried_lbs": 125,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 88814,
              "saddle_cloth_no": 5,
              "last_races": [
                  {
                      "race_instance_uid": 751239,
                      "race_datetime": "2020-02-14T21:03:00+00:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 272,
                      "course_name": "GULFSTREAM PARK",
                      "course_style_name": "Gulfstream Park",
                      "diffusion_course_name": "GULFSTREAM PARK",
                      "course_key": "gulfstream-park",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Fm",
                      "race_outcome_code": "7",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 8,
                      "official_rating": 0,
                      "race_group_code": "0"
                  }
              ],
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3077249": {
              "horse_uid": 3077249,
              "horse_name": "Jost Sayin",
              "weight_carried_lbs": 125,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 93961,
              "saddle_cloth_no": 4,
              "last_races": [
                  {
                      "race_instance_uid": 754688,
                      "race_datetime": "2020-03-26T20:36:00+00:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 272,
                      "course_name": "GULFSTREAM PARK",
                      "course_style_name": "Gulfstream Park",
                      "diffusion_course_name": "GULFSTREAM PARK",
                      "course_key": "gulfstream-park",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Fm",
                      "race_outcome_code": "2",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 9,
                      "official_rating": 0,
                      "race_group_code": "0"
                  }
              ],
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3086787": {
              "horse_uid": 3086787,
              "horse_name": "Kayseri",
              "weight_carried_lbs": 118,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 94991,
              "saddle_cloth_no": 10,
              "last_races": [
                  {
                      "race_instance_uid": 754680,
                      "race_datetime": "2020-03-26T17:00:00+00:00",
                      "race_type_code": "F",
                      "rp_postmark": null,
                      "course_uid": 272,
                      "course_name": "GULFSTREAM PARK",
                      "course_style_name": "Gulfstream Park",
                      "diffusion_course_name": "GULFSTREAM PARK",
                      "course_key": "gulfstream-park",
                      "course_country": "USA",
                      "distance_yard": 1760,
                      "distance_furlong_rounded": 8,
                      "services_desc": "Fm",
                      "race_outcome_code": "1",
                      "rp_topspeed": 0,
                      "comment": null,
                      "no_of_runners_calculated": 12,
                      "official_rating": 0,
                      "race_group_code": "0"
                  }
              ],
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3089450": {
              "horse_uid": 3089450,
              "horse_name": "Aerodynamic",
              "weight_carried_lbs": 125,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 85745,
              "saddle_cloth_no": 1,
              "last_races": null,
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3089451": {
              "horse_uid": 3089451,
              "horse_name": "Gea",
              "weight_carried_lbs": 118,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 94281,
              "saddle_cloth_no": 7,
              "last_races": null,
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3089452": {
              "horse_uid": 3089452,
              "horse_name": "Centsless Drama",
              "weight_carried_lbs": 125,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 99356,
              "saddle_cloth_no": 8,
              "last_races": null,
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          },
          "3089453": {
              "horse_uid": 3089453,
              "horse_name": "Kisses For Tizzy",
              "weight_carried_lbs": 118,
              "extra_weight": null,
              "official_rating": 0,
              "official_rating_today": 0,
              "adjustment": null,
              "jockey_id": 12637,
              "saddle_cloth_no": 9,
              "last_races": null,
              "lifetime_high": null,
              "lifetime_low": null,
              "annual_high": null,
              "annual_low": null,
              "future_rating_difference": null,
              "lh_weight_carried_lbs": null,
              "out_of_handicap": null
          }
      }
    },
    stats: {
            "trainer": {
                "11059": {
                    "trainer_uid": 11059,
                    "style_name": "Kathleen O'Connell",
                    "overall": {
                        "wins": 6,
                        "runs": 38,
                        "percent": 16,
                        "profit": -2.1
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 5,
                        "percent": 0,
                        "profit": -5
                    },
                    "2yo": {
                        "wins": 3,
                        "runs": 11,
                        "percent": 27,
                        "profit": 3.8
                    },
                    "3yo": {
                        "wins": 0,
                        "runs": 8,
                        "percent": 0,
                        "profit": -8
                    },
                    "4yo": {
                        "wins": 3,
                        "runs": 19,
                        "percent": 16,
                        "profit": 2.1
                    }
                },
                "15657": {
                    "trainer_uid": 15657,
                    "style_name": "Joseph Catanese III",
                    "overall": {
                        "wins": 0,
                        "runs": 9,
                        "percent": 0,
                        "profit": -9
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0,
                        "profit": -2
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null,
                        "profit": 0
                    },
                    "3yo": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0,
                        "profit": -1
                    },
                    "4yo": {
                        "wins": 0,
                        "runs": 8,
                        "percent": 0,
                        "profit": -8
                    }
                },
                "17883": {
                    "trainer_uid": 17883,
                    "style_name": "Michael Dini",
                    "overall": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0,
                        "profit": -2
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0,
                        "profit": -1
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null,
                        "profit": 0
                    },
                    "3yo": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0,
                        "profit": -1
                    },
                    "4yo": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0,
                        "profit": -1
                    }
                },
                "18623": {
                    "trainer_uid": 18623,
                    "style_name": "Bobby S Dibona",
                    "overall": {
                        "wins": 3,
                        "runs": 12,
                        "percent": 25,
                        "profit": 4.8
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0,
                        "profit": -2
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null,
                        "profit": 0
                    },
                    "3yo": {
                        "wins": 1,
                        "runs": 3,
                        "percent": 33,
                        "profit": 1.5
                    },
                    "4yo": {
                        "wins": 2,
                        "runs": 9,
                        "percent": 22,
                        "profit": 3.3
                    }
                },
                "18965": {
                    "trainer_uid": 18965,
                    "style_name": "Javier Negrete",
                    "overall": {
                        "wins": 0,
                        "runs": 16,
                        "percent": 0,
                        "profit": -16
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 3,
                        "percent": 0,
                        "profit": -3
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 3,
                        "percent": 0,
                        "profit": -3
                    },
                    "3yo": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0,
                        "profit": -2
                    },
                    "4yo": {
                        "wins": 0,
                        "runs": 11,
                        "percent": 0,
                        "profit": -11
                    }
                },
                "31440": {
                    "trainer_uid": 31440,
                    "style_name": "Oscar M Gonzalez",
                    "overall": {
                        "wins": 3,
                        "runs": 28,
                        "percent": 11,
                        "profit": 41.1
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 4,
                        "percent": 0,
                        "profit": -4
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 5,
                        "percent": 0,
                        "profit": -5
                    },
                    "3yo": {
                        "wins": 2,
                        "runs": 14,
                        "percent": 14,
                        "profit": -6.9
                    },
                    "4yo": {
                        "wins": 1,
                        "runs": 9,
                        "percent": 11,
                        "profit": 53
                    }
                },
                "33742": {
                    "trainer_uid": 33742,
                    "style_name": "Rodolphe Brisset",
                    "overall": {
                        "wins": 2,
                        "runs": 23,
                        "percent": 9,
                        "profit": -11.8
                    },
                    "last_14_days": {
                        "wins": 1,
                        "runs": 3,
                        "percent": 33,
                        "profit": 5.7
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0,
                        "profit": -2
                    },
                    "3yo": {
                        "wins": 2,
                        "runs": 11,
                        "percent": 18,
                        "profit": 0.2
                    },
                    "4yo": {
                        "wins": 0,
                        "runs": 10,
                        "percent": 0,
                        "profit": -10
                    }
                },
                "36268": {
                    "trainer_uid": 36268,
                    "style_name": "Carlos A David",
                    "overall": {
                        "wins": 2,
                        "runs": 12,
                        "percent": 17,
                        "profit": 4.8
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0,
                        "profit": -1
                    },
                    "2yo": {
                        "wins": 1,
                        "runs": 5,
                        "percent": 20,
                        "profit": 10.1
                    },
                    "3yo": {
                        "wins": 0,
                        "runs": 3,
                        "percent": 0,
                        "profit": -3
                    },
                    "4yo": {
                        "wins": 1,
                        "runs": 4,
                        "percent": 25,
                        "profit": -2.3
                    }
                },
                "36473": {
                    "trainer_uid": 36473,
                    "style_name": "Amador Merei Sanchez",
                    "overall": {
                        "wins": 4,
                        "runs": 27,
                        "percent": 15,
                        "profit": 63.9
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 5,
                        "percent": 0,
                        "profit": -5
                    },
                    "2yo": {
                        "wins": 3,
                        "runs": 6,
                        "percent": 50,
                        "profit": 7.9
                    },
                    "3yo": {
                        "wins": 1,
                        "runs": 17,
                        "percent": 6,
                        "profit": 60
                    },
                    "4yo": {
                        "wins": 0,
                        "runs": 4,
                        "percent": 0,
                        "profit": -4
                    }
                }
            },
            "jockey": {
                "12637": {
                    "jockey_uid": 12637,
                    "style_name": "Luca Panici",
                    "overall": {
                        "wins": 7,
                        "runs": 129,
                        "percent": 5,
                        "profit": -43
                    },
                    "last_14_days": {
                        "wins": 1,
                        "runs": 25,
                        "percent": 4,
                        "profit": -5.5
                    },
                    "2yo": {
                        "wins": 3,
                        "runs": 15,
                        "percent": 20,
                        "profit": 19.3
                    },
                    "3yo": {
                        "wins": 1,
                        "runs": 59,
                        "percent": 2,
                        "profit": -51.2
                    },
                    "4yo": {
                        "wins": 3,
                        "runs": 55,
                        "percent": 5,
                        "profit": -11.1
                    }
                },
                "85745": {
                    "jockey_uid": 85745,
                    "style_name": "Hector I Berrios",
                    "overall": {
                        "wins": 3,
                        "runs": 28,
                        "percent": 11,
                        "profit": -5
                    },
                    "last_14_days": {
                        "wins": 1,
                        "runs": 10,
                        "percent": 10,
                        "profit": -7
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 5,
                        "percent": 0,
                        "profit": -5
                    },
                    "3yo": {
                        "wins": 1,
                        "runs": 13,
                        "percent": 8,
                        "profit": -1.2
                    },
                    "4yo": {
                        "wins": 2,
                        "runs": 10,
                        "percent": 20,
                        "profit": 1.2
                    }
                },
                "87585": {
                    "jockey_uid": 87585,
                    "style_name": "Paco Lopez",
                    "overall": {
                        "wins": 49,
                        "runs": 279,
                        "percent": 18,
                        "profit": 29.4
                    },
                    "last_14_days": {
                        "wins": 2,
                        "runs": 16,
                        "percent": 13,
                        "profit": -2.9
                    },
                    "2yo": {
                        "wins": 2,
                        "runs": 11,
                        "percent": 18,
                        "profit": 15.4
                    },
                    "3yo": {
                        "wins": 16,
                        "runs": 110,
                        "percent": 15,
                        "profit": -6.4
                    },
                    "4yo": {
                        "wins": 31,
                        "runs": 158,
                        "percent": 20,
                        "profit": 20.4
                    }
                },
                "88814": {
                    "jockey_uid": 88814,
                    "style_name": "Luis Saez",
                    "overall": {
                        "wins": 83,
                        "runs": 429,
                        "percent": 19,
                        "profit": 20.4
                    },
                    "last_14_days": {
                        "wins": 7,
                        "runs": 41,
                        "percent": 17,
                        "profit": -18.2
                    },
                    "2yo": {
                        "wins": 4,
                        "runs": 17,
                        "percent": 24,
                        "profit": -3.4
                    },
                    "3yo": {
                        "wins": 35,
                        "runs": 189,
                        "percent": 19,
                        "profit": 46.5
                    },
                    "4yo": {
                        "wins": 44,
                        "runs": 223,
                        "percent": 20,
                        "profit": -22.7
                    }
                },
                "92812": {
                    "jockey_uid": 92812,
                    "style_name": "Dylan Davis",
                    "overall": {
                        "wins": 4,
                        "runs": 64,
                        "percent": 6,
                        "profit": 6.4
                    },
                    "last_14_days": {
                        "wins": 4,
                        "runs": 28,
                        "percent": 14,
                        "profit": 42.4
                    },
                    "2yo": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null,
                        "profit": 0
                    },
                    "3yo": {
                        "wins": 2,
                        "runs": 35,
                        "percent": 6,
                        "profit": 13.6
                    },
                    "4yo": {
                        "wins": 2,
                        "runs": 29,
                        "percent": 7,
                        "profit": -7.2
                    }
                },
                "93961": {
                    "jockey_uid": 93961,
                    "style_name": "Tyler Gaffalione",
                    "overall": {
                        "wins": 42,
                        "runs": 358,
                        "percent": 12,
                        "profit": -64.3
                    },
                    "last_14_days": {
                        "wins": 7,
                        "runs": 41,
                        "percent": 17,
                        "profit": 3.1
                    },
                    "2yo": {
                        "wins": 4,
                        "runs": 16,
                        "percent": 25,
                        "profit": -0.8
                    },
                    "3yo": {
                        "wins": 12,
                        "runs": 149,
                        "percent": 8,
                        "profit": -65.6
                    },
                    "4yo": {
                        "wins": 26,
                        "runs": 193,
                        "percent": 13,
                        "profit": 2.1
                    }
                },
                "94074": {
                    "jockey_uid": 94074,
                    "style_name": "Miguel Angel Vasquez",
                    "overall": {
                        "wins": 14,
                        "runs": 181,
                        "percent": 8,
                        "profit": -66.2
                    },
                    "last_14_days": {
                        "wins": 5,
                        "runs": 32,
                        "percent": 16,
                        "profit": 30.2
                    },
                    "2yo": {
                        "wins": 2,
                        "runs": 21,
                        "percent": 10,
                        "profit": -3.5
                    },
                    "3yo": {
                        "wins": 7,
                        "runs": 92,
                        "percent": 8,
                        "profit": -30.3
                    },
                    "4yo": {
                        "wins": 5,
                        "runs": 68,
                        "percent": 7,
                        "profit": -32.4
                    }
                },
                "94281": {
                    "jockey_uid": 94281,
                    "style_name": "Marcos Meneses",
                    "overall": {
                        "wins": 4,
                        "runs": 93,
                        "percent": 4,
                        "profit": -2.1
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 20,
                        "percent": 0,
                        "profit": -20
                    },
                    "2yo": {
                        "wins": 2,
                        "runs": 9,
                        "percent": 22,
                        "profit": 14.9
                    },
                    "3yo": {
                        "wins": 0,
                        "runs": 41,
                        "percent": 0,
                        "profit": -41
                    },
                    "4yo": {
                        "wins": 2,
                        "runs": 43,
                        "percent": 5,
                        "profit": 24
                    }
                },
                "94991": {
                    "jockey_uid": 94991,
                    "style_name": "Emisael Jaramillo",
                    "overall": {
                        "wins": 51,
                        "runs": 286,
                        "percent": 18,
                        "profit": 7.6
                    },
                    "last_14_days": {
                        "wins": 2,
                        "runs": 34,
                        "percent": 6,
                        "profit": -17.9
                    },
                    "2yo": {
                        "wins": 13,
                        "runs": 41,
                        "percent": 32,
                        "profit": 20.4
                    },
                    "3yo": {
                        "wins": 16,
                        "runs": 127,
                        "percent": 13,
                        "profit": 14.3
                    },
                    "4yo": {
                        "wins": 22,
                        "runs": 118,
                        "percent": 19,
                        "profit": -27.1
                    }
                },
                "99356": {
                    "jockey_uid": 99356,
                    "style_name": "Cristian A Torres",
                    "overall": {
                        "wins": 1,
                        "runs": 65,
                        "percent": 2,
                        "profit": -38
                    },
                    "last_14_days": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null,
                        "profit": 0
                    },
                    "2yo": {
                        "wins": 1,
                        "runs": 21,
                        "percent": 5,
                        "profit": 6
                    },
                    "3yo": {
                        "wins": 0,
                        "runs": 28,
                        "percent": 0,
                        "profit": -28
                    },
                    "4yo": {
                        "wins": 0,
                        "runs": 16,
                        "percent": 0,
                        "profit": -16
                    }
                }
            },
            "horse": {
                "2159427": {
                    "horse_uid": 2159427,
                    "horse_name": "Rosa Star",
                    "going": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0
                    },
                    "course": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    }
                },
                "2382210": {
                    "horse_uid": 2382210,
                    "horse_name": "Catsoutofthebag",
                    "going": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0
                    },
                    "course": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    }
                },
                "3029154": {
                    "horse_uid": 3029154,
                    "horse_name": "She Fled The Scene",
                    "going": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0
                    },
                    "course": {
                        "wins": 0,
                        "runs": 2,
                        "percent": 0
                    }
                },
                "3029157": {
                    "horse_uid": 3029157,
                    "horse_name": "Strella's War",
                    "going": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    },
                    "course": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    }
                },
                "3077249": {
                    "horse_uid": 3077249,
                    "horse_name": "Jost Sayin",
                    "going": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    },
                    "course": {
                        "wins": 0,
                        "runs": 1,
                        "percent": 0
                    }
                },
                "3086787": {
                    "horse_uid": 3086787,
                    "horse_name": "Kayseri",
                    "going": {
                        "wins": 1,
                        "runs": 1,
                        "percent": 100
                    },
                    "distance": {
                        "wins": 1,
                        "runs": 1,
                        "percent": 100
                    },
                    "course": {
                        "wins": 1,
                        "runs": 1,
                        "percent": 100
                    }
                },
                "3089450": {
                    "horse_uid": 3089450,
                    "horse_name": "Aerodynamic",
                    "going": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "course": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    }
                },
                "3089451": {
                    "horse_uid": 3089451,
                    "horse_name": "Gea",
                    "going": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "course": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    }
                },
                "3089452": {
                    "horse_uid": 3089452,
                    "horse_name": "Centsless Drama",
                    "going": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "course": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    }
                },
                "3089453": {
                    "horse_uid": 3089453,
                    "horse_name": "Kisses For Tizzy",
                    "going": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "distance": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    },
                    "course": {
                        "wins": 0,
                        "runs": 0,
                        "percent": null
                    }
                }
            }
    },
  }

  const runnersArray = [];

  for(let key in response.data.runners) {
    runnersArray.push(_.pick(response.data.runners[key], runnersFields));
  }

  
  // const horses = {};

  // for (let key in feed) {
  //   let day = feed[key];
  //   let races = day.races;
  //   console.log(day);
  //   races.forEach(race => {
  //     let runners = race.API_runners;
  //     runners.forEach(runner => {
  //       let horse_uid = runner.horse_uid;
  //       let horse_name= runner.horse_name;

  //       console.log(horse_uid !== undefined)

  //       horses[horse_uid] = {horse_uid, horse_name}

  //     })
  //   })
  // }

  await graphql(`
    {
      allWordpressWpHorse {
        totalCount
        nodes {
          acf {
            horse_name
            horse_uid
          }
        }
      }
      allWordpressAcfRace {
        nodes{
          acf {
            title
            raceid
            race_datetime
          }
        }
      }
    }
    `).then(async result => {
      const races = result.data.allWordpressAcfRace;

      //const feed = await axios.get("https://jsonplaceholder.typicode.com/posts")

      // Create Page for Every Race
      races.nodes.forEach(race => {
        createPage({
          path: `/races/${race.acf.raceid}`,
          component: require.resolve(`./src/templates/race.js`),
          context: {
            race: race.acf,
            feed: JSON.stringify(feed.data),
            runners: JSON.stringify(runnersArray),
            data: JSON.stringify(data),
          },
        });
      });
    });
}
