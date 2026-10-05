'use client';

import { useState, useEffect, useMemo } from 'react';
import HeroInner from '@/components/sections/HeroInner';
import { getBackendApiUrl } from '@/lib/runtime-config';
import VendorRegistrationModal from '@/components/layout/VendorRegistrationModal';

const BASE = getBackendApiUrl();

type Vendor = {
  id: number;
  category: string;
  company: string;
  contact_person: string;
  tel: string;
  fax: string;
  email: string;
  address: string;
  state?: string;
  expiry_date: string; // YYYY-MM-DD or DD-MM-YYYY
  manufacturer?: string; // authorized manufacturer (marked with *)
};

const CAT_ULTRA = 'Ultrasonic Thickness Measurement';
const CAT_INWATER = 'In-Water Survey';
const CAT_RADIO = 'Radio Communication Equipment Survey';
const CAT_VDR = 'Performance Tests of VDR / SVDR';
const CAT_FIRE = 'Fire Extinguishing Equipment & Self-Contained Breathing Apparatus Survey';
const CAT_INFLATABLE = 'Inflatable (Liferafts, Lifejackets, Rescue Boats), HRUs & Marine Evacuation System Service';
const CAT_LIFEBOAT = 'Lifeboat, Launching Appliances, On-Load Release Gears & Davit-Launched Liferaft Release Hooks Service';
const CAT_BWMS = 'BWMS Commissioning Testing';

// DEMO preview data — replaced automatically by live backend vendors.
const DEMO_VENDORS: Vendor[] = [
  { id: 1, category: CAT_ULTRA, company: 'Proscan Sdn. Bhd.', contact_person: 'Mohd Raznan Ramli', tel: '+607-2555245', fax: '+607-2555246', email: 'pro@proscan.com.my', address: 'No. 27, Jalan Siakap 3, Taman Pasir Putih, 81700 Pasir Gudang, Johor, Malaysia.', expiry_date: '2025-03-20' },
  { id: 2, category: CAT_ULTRA, company: 'Dynanential Engineering Sdn. Bhd.', contact_person: 'Mohd Hussein Wagini', tel: '+607-3889127', fax: '+607-3889128', email: 'dyna@dynanential.com.my', address: 'No. 42, Jalan Bukit 10, Kawasan Miel, Bandar Seri Alam Fasa VI, 81750 Masai, Johor, Malaysia.', expiry_date: '2025-03-24' },
  { id: 3, category: CAT_ULTRA, company: 'Borneo Welders', contact_person: 'Augustine Kong', tel: '+6088-496913', fax: '+6088-497913', email: 'bw.delliott@yahoo.com', address: 'Lot 28, RBF Phase 3, Lorong KKIP 1C, IZ2, KKIP Selatan, 88460 Kota Kinabalu, Sabah, Malaysia.', expiry_date: '2024-07-22' },
  { id: 4, category: CAT_ULTRA, company: 'UET Inspection Services', contact_person: 'C. P. Leong', tel: '+6012-7373951', fax: '+607-3311372', email: 'uetcpleong@gmail.com', address: 'Suite #999, MBE Nusa Bestari, Lot PTD 12351, Taman Tan Sri Yaacob, 81200 Johor Bahru, Johor, Malaysia.', expiry_date: '2025-04-14' },
  { id: 5, category: CAT_ULTRA, company: 'PolyNDT Pte. Ltd.', contact_person: 'Wine Aung', tel: '+65-67754012', fax: '+65-6775401', email: 'polyndt@signet.com.sg', address: 'No. 60, Pandan Loop, Pandan Industrial Estate, Singapore 128275.', expiry_date: '2025-12-11' },
  { id: 6, category: CAT_ULTRA, company: 'Maju NDT Services Sdn. Bhd.', contact_person: 'Mujahid Bin Abu Bakar', tel: '+603-55236853', fax: '+603-55132120', email: 'contact@majundt.com', address: 'No. 44, Ground Floor, Block 4, Worldwide Business Centre, Seksyen 13, 40100 Shah Alam, Selangor, Malaysia.', expiry_date: '2023-04-23' },
  { id: 7, category: CAT_ULTRA, company: 'PT. Maritim Teknik Inspeksi', contact_person: 'Permata Sari', tel: '+62-81372000343', fax: '-', email: 'info@rispek.com', address: 'Ruko Tiban Hills, Tiban Baru, Sekupang, Batam, Indonesia 29424.', expiry_date: '2024-05-18' },
  { id: 8, category: CAT_ULTRA, company: 'PT. Putra Kahar Riwayati', contact_person: 'Zulkifli Zulkarnaen', tel: '+62-8117788872', fax: '+62-778324510', email: 'pkr@pt-pkr.co.id', address: 'Jl. Tiban Koperasi Blok V, No. 1, Tiban Baru, Sekupang, Batam, Indonesia.', expiry_date: '2025-04-19' },
  { id: 9, category: CAT_ULTRA, company: 'IPI Skill Sdn. Bhd.', contact_person: 'Wan Mohd Faiza', tel: '+6016-6664675', fax: '-', email: 'info@ipissbgroup.com', address: 'PT 758, Level 2, Bangunan Wisma Puteri Saadong, Jalan Besar Wakaf Bharu, 16250 Wakaf Bharu, Kelantan, Malaysia.', expiry_date: '2024-03-17' },
  { id: 10, category: CAT_ULTRA, company: 'A-Star Testing & Inspection (S) Pte. Ltd.', contact_person: 'Ajay Manjal', tel: '+65-62616162', fax: '+65-62616163', email: 'quality@astartesting.com.sg', address: 'No. 5, Soon Lee Street, #03-36/37 Pioneer Point, Singapore 627607.', expiry_date: '2024-06-18' },
  { id: 11, category: CAT_ULTRA, company: 'Energy Workforce Sdn. Bhd.', contact_person: 'Lingesh Sivalingam', tel: '+603-40255000', fax: '+603-40254000', email: 'info@ewfgroup.com', address: 'Unit 82-G, 1 & 2, Kuala Lumpur Traders Square (KLTS), No. 99, Jalan Gombak, 53000 Setapak, Kuala Lumpur, Malaysia.', expiry_date: '2024-08-26' },
  { id: 12, category: CAT_ULTRA, company: 'Dynasys Technology & Engineering Sdn. Bhd.', contact_person: 'Pui Khin Pin', tel: '+6085-428399', fax: '+6085-435501', email: 'purchasing@dynasys.com.my', address: 'Lot 1750, Jalan Prunus 3, Piasau Utara 4, 98000 Miri, Sarawak, Malaysia.', expiry_date: '2025-01-25' },
  { id: 13, category: CAT_INWATER, company: 'Kejuruteraan Purnama Sdn. Bhd.', contact_person: 'Muhammad Haniff', tel: '+609-8502142', fax: '+609-8502145', email: 'kpsbkmn@gmail.com', address: 'No. 666 A, Jalan Air Putih, 24000 Kemaman, Terengganu, Malaysia.', expiry_date: '2025-05-21' },
  { id: 14, category: CAT_INWATER, company: 'Nadi Marine Sdn. Bhd.', contact_person: 'Zaini Bin Mahamood', tel: '+607-5073502', fax: '+607-5073503', email: 'info@nadimarine.com.my', address: 'Lot 6200, Kampung Pekajang, 81560 Gelang Patah, Johor, Malaysia.', expiry_date: '2024-09-02' },
  { id: 15, category: CAT_INWATER, company: 'Ezany Resources Sdn. Bhd.', contact_person: 'Ahmad Zani Bin Ab Rahman', tel: '+606-3124531', fax: '+606-3125842', email: 'ez_ezany001@yahoo.com', address: 'Lot 10735, Batu 12, Bertam Ulu, SPA Highway, 76450 Melaka, Malaysia.', expiry_date: '2024-03-20' },
  { id: 16, category: CAT_INWATER, company: 'Oceanic Underwater Services Sdn. Bhd.', contact_person: 'Raymond T. S. Tan', tel: '+603-31686479', fax: '+603-31671971', email: 'oceanic_raymondtan@hotmail.com', address: 'No. 199, Jalan Kastam, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2025-06-25' },
  { id: 17, category: CAT_INWATER, company: 'Advantage Marine Services (Malaysia) Sdn. Bhd.', contact_person: 'Derek Siow', tel: '+6019-7230016', fax: '-', email: 'sales@advantagemarine.com.my', address: 'Unit 45, Jalan Sentral 2, Taman Nusa Sentral, 79100 Nusajaya, Johor, Malaysia.', expiry_date: '2025-11-29' },
  { id: 18, category: CAT_INWATER, company: 'Dive Resources Sdn. Bhd.', contact_person: 'Nia Illanie Awanis', tel: '+607-5096667', fax: '-', email: 'sales@diveresources.com.my', address: 'No. 4, Jalan Laman Setia 7/8, Taman Laman Setia, 81550 Gelang Patah, Johor, Malaysia.', expiry_date: '2024-11-23' },
  { id: 19, category: CAT_INWATER, company: 'Globaltechserve Marine Sdn. Bhd.', contact_person: 'Farrah Ayshah', tel: '+603-76522805', fax: '+603-76522806', email: 'sales@globaltechservemarine.com', address: 'B-3-40, Dataran Cascades, No. 13A, Jalan PJU 5/1, Kota Damansara, 47810 Petaling Jaya, Selangor, Malaysia.', expiry_date: '2023-10-30' },
  { id: 20, category: CAT_INWATER, company: 'Weldzone Underwater Sdn. Bhd.', contact_person: 'Mohammed Al-Fayed', tel: '+605-6888545', fax: '-', email: 'fayedweldzoneunderwater@gmail.com', address: 'Lot PT 10154, Kawasan Perindustrian Seri Manjung, 32040 Seri Manjung, Perak, Malaysia.', expiry_date: '2023-12-31' },
  { id: 21, category: CAT_INWATER, company: 'Sleipnir Offshore Sdn. Bhd.', contact_person: 'Buddie Temban', tel: '+6013-8497068', fax: '+6085-658862', email: 'sales@sleipniroffshore.com', address: 'Lot 2401, Block 4, Level 4, No. 4.01, Miri Concession Land District, 98000 Miri, Sarawak, Malaysia.', expiry_date: '2023-12-24' },
  { id: 22, category: CAT_INWATER, company: 'Blackpearl Subsea Services (M) Sdn. Bhd.', contact_person: 'Fajrul Omar', tel: '+6014-9658930', fax: '-', email: 'admin@bpsubsea.com', address: 'Blok A1 5-1, Taman Melati, 53100 Setapak, Kuala Lumpur, Malaysia.', expiry_date: '2024-09-15' },
  { id: 23, category: CAT_INWATER, company: 'Nakhoda Maritime Sdn. Bhd.', contact_person: 'Hisham Ahmad', tel: '+606-8525669', fax: '-', email: 'nakhodamaritime@gmail.com', address: 'No. 128-1, Jalan TU 2, Taman Tasik Utama, 75450 Ayer Keroh, Melaka, Malaysia.', expiry_date: '2024-09-08' },
  { id: 24, category: CAT_INWATER, company: 'Borneo Subsea Services (Malaysia) Sdn. Bhd.', contact_person: 'Jeremy van Houten', tel: '+6087-417105', fax: '+6087-410963', email: 'info@borneosubsea.com', address: 'Lot 6879, Bestari Warehouse, Jalan Patau-Patau, 87000 Labuan Federal Territory, Malaysia.', expiry_date: '2025-01-24' },
  { id: 25, category: CAT_INWATER, company: 'Pioneer Pegasus Sdn. Bhd.', contact_person: 'Khairulmuzammil Yuzri', tel: '+603-55244347', fax: '+603-55244346', email: 'mail@pioneerpegasus.com.my', address: 'No. 23 & 23A, Jalan Badminton 13/29, Seksyen 13, 40100 Shah Alam, Selangor, Malaysia.', expiry_date: '2026-02-09' },
  { id: 26, category: CAT_RADIO, company: 'Orion Maritime (M) Sdn. Bhd.', contact_person: 'Ahmad Luqman', tel: '+603-33245023', fax: '+603-33245072', email: 'orionmaritime@gmail.com', address: '15B, Jalan Bayu Tinggi 2/KS 6, Batu Unjur, 41200 Klang, Selangor, Malaysia.', expiry_date: '2024-12-26' },
  { id: 27, category: CAT_RADIO, company: 'Idrisko Technology Sdn. Bhd.', contact_person: 'Nai Bin Mohd', tel: '+603-22821691', fax: '+603-22835799', email: 'general@idrisko.com.my', address: 'No. 1, Jalan 2/112F, Pantai Indah, Jalan Pantai Dalam, 59200 Kuala Lumpur, Malaysia.', expiry_date: '2023-05-12' },
  { id: 28, category: CAT_RADIO, company: 'Kencom Enterprise Sdn. Bhd.', contact_person: 'Lim Fang Ming', tel: '+6087-413867', fax: '+6087-412943', email: 'kencom1983@gmail.com', address: 'U0414, 1st Floor, Jalan Bunga Dahlia, 87020 Wilayah Persekutuan Labuan, Malaysia.', expiry_date: '2024-08-23' },
  { id: 29, category: CAT_RADIO, company: 'Seacom Marine Sdn. Bhd.', contact_person: 'Lim Gip Lip', tel: '+6016-7102008', fax: '+6085-664778', email: 'seacomlb@seacom-marine.com', address: 'Lot No. 1, Level 2, Labuan Times Square, Jalan Labuan Times Square, 87000 Wilayah Persekutuan Labuan, Malaysia.', expiry_date: '2026-02-25' },
  { id: 30, category: CAT_RADIO, company: 'MRS Marine Services (M) Sdn. Bhd.', contact_person: 'R. Rajasakal', tel: '+603-33422204', fax: '+603-33422205', email: 'general@mrs-marine.com.my', address: 'No. 14, Tingkat 1, Jalan Zapin H/KU5, Taman Mutiara Point, Jalan Meru, 41050 Klang, Selangor, Malaysia.', expiry_date: '2024-07-16' },
  { id: 31, category: CAT_RADIO, company: 'Norsk Marine Electronic', contact_person: 'Lan Kuen Cheong', tel: '+65-62754784', fax: '+65-62737302', email: 'linkids@singnet.com.sg', address: 'No. 71, Bukit Batok Crescent, #09-08 Prestige Centre, Singapore 658071.', expiry_date: '2023-11-23' },
  { id: 32, category: CAT_RADIO, company: 'World Class Marine Sdn. Bhd.', contact_person: 'Ling Tung Huo', tel: '+6084-212398', fax: '+6084-214398', email: 'wcmarine95@gmail.com', address: 'No. 1, First Floor, Lorong 7G, Jalan Pahlawan, 96000 Sibu, Sarawak, Malaysia.', expiry_date: '2024-04-06' },
  { id: 33, category: CAT_RADIO, company: 'Radii Teknologi Sdn. Bhd.', contact_person: 'Goh Eng Hooi', tel: '+603-31688328', fax: '+603-31668328', email: 'sales@radii.com.my', address: 'Wisma Radii, No. 327, Jalan Teluk Gadong KS/01, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2024-04-02' },
  { id: 34, category: CAT_RADIO, company: 'Antara Maritime Services Sdn. Bhd.', contact_person: 'Muhammad Fikri Bin Mohd Noor', tel: '+603-89202889', fax: '+603-89201889', email: 'antaramaritime@gmail.com', address: '22A-3, Tingkat 3, Jalan Puteri 3A/5, Bandar Puteri Bangi, 43000 Kajang, Selangor, Malaysia.', expiry_date: '2024-11-24' },
  { id: 35, category: CAT_RADIO, company: 'Tele Time Technology Sdn. Bhd.', contact_person: 'Rajalingam Raman', tel: '+603-33186767', fax: '+603-33186767', email: 'general@teletime.com.my', address: 'No. 28, Jalan Jasmin 3, Bandar Botanik, 41200 Klang, Selangor, Malaysia.', expiry_date: '2023-04-02' },
  { id: 36, category: CAT_RADIO, company: 'Racom Electronics Sdn. Bhd.', contact_person: 'Cristina Yahakub', tel: '+603-33453927', fax: '+603-33453928', email: 'klang@racom.com.my', address: 'No. 6, 1st Floor, Jalan Tiara 5, Bandar Baru Klang, 41150 Klang, Selangor, Malaysia.', expiry_date: '2024-04-06' },
  { id: 37, category: CAT_VDR, manufacturer: 'FURUNO', company: 'Seacom Marine Sdn. Bhd.', contact_person: 'Lim Gip Lip', tel: '+6016-7102008', fax: '+6085-664778', email: 'seacomlb@seacom-marine.com', address: 'Lot No. 1, Level 2, Labuan Times Square, Jalan Labuan Times Square, 87000 Wilayah Persekutuan Labuan, Malaysia.', expiry_date: '2026-02-25' },
  { id: 38, category: CAT_VDR, manufacturer: 'FURUNO', company: 'Radii Teknologi Sdn. Bhd.', contact_person: 'Goh Eng Hooi', tel: '+603-31688328', fax: '+603-31668328', email: 'sales@radii.com.my', address: 'Wisma Radii, No. 327, Jalan Teluk Gadong KS/01, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2024-04-02' },
  { id: 39, category: CAT_VDR, manufacturer: 'JRC', company: 'Racom Electronics Sdn. Bhd.', contact_person: 'Cristina Yahakub', tel: '+603-33453927', fax: '+603-33453928', email: 'klang@racom.com.my', address: 'No. 6, 1st Floor, Jalan Tiara 5, Bandar Baru Klang, 41150 Klang, Selangor, Malaysia.', expiry_date: '2024-04-06' },
  { id: 40, category: CAT_VDR, manufacturer: 'NSR', company: 'MRS Marine Services (M) Sdn. Bhd.', contact_person: 'R. Rajasakal', tel: '+603-33422204', fax: '+603-33422205', email: 'general@mrs-marine.com.my', address: 'No. 14, Tingkat 1, Jalan Zapin H/KU5, Taman Mutiara Point, Jalan Meru, 41050 Klang, Selangor, Malaysia.', expiry_date: '2024-07-16' },
  { id: 41, category: CAT_FIRE, company: 'Index-Cool Corporation (M) Sdn. Bhd.', contact_person: 'Stephen Tan', tel: '+603-31677001', fax: '+603-31676014', email: 'sales@index-cool.com.my', address: 'No. 6, Jalan Pendamar, Cempaka Emas Industrial Estate, Pandamaran, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2025-12-19' },
  { id: 42, category: CAT_FIRE, company: 'SHM Shipcare Sdn. Bhd.', contact_person: 'Huzefa Zainuddin', tel: '+603-33235253', fax: '-', email: 'malaysia@shmgroup.com', address: 'No. 11 & 15, Jalan Rebena, Off Jalan Seruling 59, Taman Klang Jaya, 41200 Klang, Selangor, Malaysia.', expiry_date: '2025-02-18' },
  { id: 43, category: CAT_FIRE, company: 'Gateway Marketing Sdn. Bhd.', contact_person: 'Raven Chiong', tel: '+6084-327849', fax: '+6084-317857', email: 'gatewaysibu@gmail.com', address: 'No. 24, Lorong Dr. Wong Soon Kai 4D, 96000 Sibu, Sarawak, Malaysia.', expiry_date: '2024-04-25' },
  { id: 44, category: CAT_FIRE, company: 'DS Marine Services Sdn. Bhd.', contact_person: 'Sivadassnaidu Maniam', tel: '+60127778802', fax: '-', email: 'services@dsmarine.com.my', address: 'No. 16, Jalan SILC 2/14, Kawasan Perindustrian SILC, 79200 Iskandar Puteri, Johor Bahru, Johor, Malaysia.', expiry_date: '2023-12-16' },
  { id: 45, category: CAT_FIRE, company: 'Keisha Marine Services Sdn. Bhd.', contact_person: 'Eddie Kong', tel: '+603-31669717', fax: '+603-31669727', email: 'keisha88@keishamarine.com', address: 'No. 21 & 23, Jalan Selat Selatan 7/KS05, Taman Perindustrian Sobena Jaya, Pandamaran, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2024-05-25' },
  { id: 46, category: CAT_FIRE, company: 'Ten Marine Safety Sdn. Bhd.', contact_person: 'Hamzah Bin Hassan', tel: '+6017-7447756', fax: '-', email: 'ten.marinesb@gmail.com', address: 'No. 36, Jalan SILC 2/15, Kawasan Perindustrian SILC, 79200 Iskandar Puteri, Johor, Malaysia.', expiry_date: '2025-05-31' },
  { id: 47, category: CAT_FIRE, company: 'PT. Batam Marine Indobahari', contact_person: 'Rizki Rahmadi', tel: '+62-82172750075', fax: '-', email: 'info@marinesafetys.co.id', address: 'Kompleks Pusat Seken, Bukit Beruntung Blok B VIII No 25-26 Sei Panas Batam, Province Kepulauan Riau, Indonesia.', expiry_date: '2025-09-15' },
  { id: 48, category: CAT_FIRE, company: 'Global Marine Safety & Services (M) Sdn. Bhd.', contact_person: 'Venugopal S', tel: '+607-3866686', fax: '+607-3867686', email: 'gms@gmsmalaysia.com', address: 'No. 9, Jalan Cenderai 7, Kawasan Perindustrian Kota Puteri, 81750 Masai, Johor, Malaysia.', expiry_date: '2025-10-17' },
  { id: 49, category: CAT_INFLATABLE, company: 'Index-Cool Corporation (M) Sdn. Bhd.', contact_person: 'Stephen Tan', tel: '+603-31677001', fax: '+603-31676014', email: 'sales@index-cool.com.my', address: 'No. 6, Jalan Pendamar, Cempaka Emas Industrial Estate, Pandamaran, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2025-12-19' },
  { id: 50, category: CAT_INFLATABLE, company: 'SHM Shipcare Sdn. Bhd.', contact_person: 'Huzefa Zainuddin', tel: '+603-33235253', fax: '-', email: 'malaysia@shmgroup.com', address: 'No. 11 & 15, Jalan Rebena, Off Jalan Seruling 59, Taman Klang Jaya, 41200 Klang, Selangor, Malaysia.', expiry_date: '2025-02-18' },
  { id: 51, category: CAT_INFLATABLE, company: 'DS Marine Services Sdn. Bhd.', contact_person: 'Sivadassnaidu Maniam', tel: '+60127778802', fax: '-', email: 'services@dsmarine.com.my', address: 'No. 16, Jalan SILC 2/14, Kawasan Perindustrian SILC, 79200 Iskandar Puteri, Johor Bahru, Johor, Malaysia.', expiry_date: '2023-12-16' },
  { id: 52, category: CAT_INFLATABLE, company: 'Keisha Marine Services Sdn. Bhd.', contact_person: 'Eddie Kong', tel: '+603-31669717', fax: '+603-31669727', email: 'keisha88@keishamarine.com', address: 'No. 21 & 23, Jalan Selat Selatan 7/KS05, Taman Perindustrian Sobena Jaya, Pandamaran, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2024-05-25' },
  { id: 53, category: CAT_INFLATABLE, company: 'Ten Marine Safety Sdn. Bhd.', contact_person: 'Hamzah Bin Hassan', tel: '+6017-7447756', fax: '-', email: 'ten.marinesb@gmail.com', address: 'No. 36, Jalan SILC 2/15, Kawasan Perindustrian SILC, 79200 Iskandar Puteri, Johor, Malaysia.', expiry_date: '2025-05-31' },
  { id: 54, category: CAT_INFLATABLE, company: 'PT. Batam Marine Indobahari', contact_person: 'Rizki Rahmadi', tel: '+62-82172750075', fax: '-', email: 'info@marinesafetys.co.id', address: 'Kompleks Pusat Seken, Bukit Beruntung Blok B VIII No 25-26 Sei Panas Batam, Province Kepulauan Riau, Indonesia.', expiry_date: '2025-09-15' },
  { id: 55, category: CAT_INFLATABLE, company: 'Global Marine Safety & Services (M) Sdn. Bhd.', contact_person: 'Venugopal S', tel: '+607-3866686', fax: '+607-3867686', email: 'gms@gmsmalaysia.com', address: 'No. 9, Jalan Cenderai 7, Kawasan Perindustrian Kota Puteri, 81750 Masai, Johor, Malaysia.', expiry_date: '2025-10-17' },
  { id: 56, category: CAT_LIFEBOAT, company: 'Index-Cool Corporation (M) Sdn. Bhd.', contact_person: 'Stephen Tan', tel: '+603-31677001', fax: '+603-31676014', email: 'sales@index-cool.com.my', address: 'No. 6, Jalan Pendamar, Cempaka Emas Industrial Estate, Pandamaran, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2025-12-19' },
  { id: 57, category: CAT_LIFEBOAT, company: 'SHM Shipcare Sdn. Bhd.', contact_person: 'Huzefa Zainuddin', tel: '+603-33235253', fax: '-', email: 'malaysia@shmgroup.com', address: 'No. 11 & 15, Jalan Rebena, Off Jalan Seruling 59, Taman Klang Jaya, 41200 Klang, Selangor, Malaysia.', expiry_date: '2025-02-18' },
  { id: 58, category: CAT_LIFEBOAT, company: 'First Marine Services (M) Sdn. Bhd.', contact_person: 'Meor Amir Faizal', tel: '+609-5736333', fax: '+609-5737633', email: 'meor@fms.com.my', address: 'Lot 35, Sektor 1, Jalan IM 3/6, Bandar Indera Mahkota, 25200 Kuantan, Pahang, Malaysia.', expiry_date: '2023-08-05' },
  { id: 59, category: CAT_LIFEBOAT, company: 'DS Marine Services Sdn. Bhd.', contact_person: 'Sivadassnaidu Maniam', tel: '+60127778802', fax: '-', email: 'services@dsmarine.com.my', address: 'No. 16, Jalan SILC 2/14, Kawasan Perindustrian SILC, 79200 Iskandar Puteri, Johor Bahru, Johor, Malaysia.', expiry_date: '2023-12-16' },
  { id: 60, category: CAT_LIFEBOAT, company: 'Keisha Marine Services Sdn. Bhd.', contact_person: 'Eddie Kong', tel: '+603-31669717', fax: '+603-31669727', email: 'keisha88@keishamarine.com', address: 'No. 21 & 23, Jalan Selat Selatan 7/KS05, Taman Perindustrian Sobena Jaya, Pandamaran, 42000 Port Klang, Selangor, Malaysia.', expiry_date: '2024-05-25' },
  { id: 61, category: CAT_LIFEBOAT, company: 'Ten Marine Safety Sdn. Bhd.', contact_person: 'Hamzah Bin Hassan', tel: '+6017-7447756', fax: '-', email: 'ten.marinesb@gmail.com', address: 'No. 36, Jalan SILC 2/15, Kawasan Perindustrian SILC, 79200 Iskandar Puteri, Johor, Malaysia.', expiry_date: '2025-05-31' },
  { id: 62, category: CAT_LIFEBOAT, company: 'PT. Batam Marine Indobahari', contact_person: 'Rizki Rahmadi', tel: '+62-82172750075', fax: '-', email: 'info@marinesafetys.co.id', address: 'Kompleks Pusat Seken, Bukit Beruntung Blok B VIII No 25-26 Sei Panas Batam, Province Kepulauan Riau, Indonesia.', expiry_date: '2025-09-15' },
  { id: 63, category: CAT_LIFEBOAT, company: 'Global Marine Safety & Services (M) Sdn. Bhd.', contact_person: 'Venugopal S', tel: '+607-3866686', fax: '+607-3867686', email: 'gms@gmsmalaysia.com', address: 'No. 9, Jalan Cenderai 7, Kawasan Perindustrian Kota Puteri, 81750 Masai, Johor, Malaysia.', expiry_date: '2025-10-17' },
  { id: 64, category: CAT_LIFEBOAT, company: 'Berkat Offshore Solution Sdn. Bhd.', contact_person: 'Satthea Jagathesan', tel: '+606-6013048', fax: '-', email: 'inquiry@berkatoffshore.com', address: 'No. 221, 1st Floor, Jalan S2 B10, Uptown Avenue, Seremban 2, 70300 Seremban, Negeri Sembilan.', expiry_date: '2026-01-17' },
  { id: 65, category: CAT_BWMS, company: 'SGS (Malaysia) Sdn. Bhd.', contact_person: 'Muhammad Syahir Bin Mohd Nawi', tel: '+603-76270080', fax: '+603-76270082', email: 'syahir.mohdnawi@sgs.com', address: 'Lot 3 & 4, Persiaran Jubli Perak, Seksyen 22, 40300 Shah Alam, Selangor, Malaysia.', expiry_date: '2025-08-30' },
  { id: 66, category: CAT_BWMS, company: 'Goltens Singapore Pte. Ltd.', contact_person: 'Glen Chong', tel: '+65-68615220', fax: '+65-68611037', email: 'singapore@goltens.com', address: 'No. 6A Benoi Road, Singapore 629881.', expiry_date: '2025-11-15' },
];

const CATEGORIES = [
  CAT_ULTRA,
  CAT_INWATER,
  CAT_RADIO,
  CAT_VDR,
  CAT_FIRE,
  CAT_INFLATABLE,
  CAT_LIFEBOAT,
  CAT_BWMS,
];

// Icon + short label + scope description for each service category.
const CATEGORY_META: Record<string, { icon: string; short: string; desc: string }> = {
  [CAT_ULTRA]:      { icon: 'bi-soundwave',      short: 'Ultrasonic Thickness Measurement', desc: 'Approved firms performing ultrasonic thickness measurement (UTM) of hull structures and steel plating for class and statutory surveys.' },
  [CAT_INWATER]:    { icon: 'bi-water',          short: 'In-Water Survey',                   desc: 'Approved diving/ROV service suppliers carrying out in-water surveys (IWS) of the underwater hull as an alternative to dry-docking.' },
  [CAT_RADIO]:      { icon: 'bi-broadcast-pin',  short: 'Radio Communication Equipment Survey', desc: 'Approved suppliers for the survey and testing of GMDSS and radio communication equipment on board vessels.' },
  [CAT_VDR]:        { icon: 'bi-record-circle',  short: 'VDR / SVDR Performance Tests',        desc: 'Approved service providers for the annual performance test of Voyage Data Recorders (VDR) and Simplified VDR (S-VDR), by authorised manufacturer.' },
  [CAT_FIRE]:       { icon: 'bi-fire',           short: 'Fire Extinguishing & SCBA Survey',   desc: 'Approved suppliers servicing fire-extinguishing equipment and Self-Contained Breathing Apparatus (SCBA).' },
  [CAT_INFLATABLE]: { icon: 'bi-life-preserver', short: 'Inflatable Life-Saving Appliances',  desc: 'Approved stations servicing inflatable liferafts, lifejackets, rescue boats, HRUs and marine evacuation systems.' },
  [CAT_LIFEBOAT]:   { icon: 'bi-lifebuoy',       short: 'Lifeboat & Launching Appliances',    desc: 'Approved suppliers for lifeboats, launching appliances, on-load release gears and davit-launched liferaft release hooks.' },
  [CAT_BWMS]:       { icon: 'bi-droplet-half',   short: 'BWMS Commissioning Testing',         desc: 'Approved laboratories/suppliers for Ballast Water Management System (BWMS) commissioning testing.' },
};
const catMeta = (c: string) => CATEGORY_META[c] || { icon: 'bi-clipboard-check', short: c, desc: '' };

// Expiry status for badge colouring.
function expiryStatus(d: string): 'expired' | 'soon' | 'ok' {
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return 'ok';
  const days = Math.ceil((dt.getTime() - Date.now()) / 86400000);
  if (days < 0) return 'expired';
  if (days <= 60) return 'soon';
  return 'ok';
}

function fmtDate(d: string) {
  if (!d) return '-';
  // handle YYYY-MM-DD
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(d);
  const dt = iso ? new Date(d) : new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function isExpired(d: string) {
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return false;
  return dt.getTime() < Date.now();
}

export default function VendorsClient() {
  const [vendors, setVendors] = useState<Vendor[]>(DEMO_VENDORS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(''); // '' = discovery mode (no list shown)
  const [activeState, setActiveState] = useState('');
  const [regOpen, setRegOpen] = useState(false);
  const [detail, setDetail] = useState<Vendor | null>(null);
  const [catList, setCatList] = useState<{ name: string; short_label?: string; icon?: string; description?: string }[]>([]);

  useEffect(() => {
    fetch(`${BASE}/api/public/vendors`)
      .then(r => r.json())
      .then(j => { if (j.success && Array.isArray(j.data) && j.data.length > 0) setVendors(j.data); })
      .catch(() => { /* backend offline — keep demo */ })
      .finally(() => setLoading(false));
    fetch(`${BASE}/api/public/vendor-categories`)
      .then(r => r.json())
      .then(j => { if (j.success && Array.isArray(j.data) && j.data.length > 0) setCatList(j.data); })
      .catch(() => { /* fall back to hardcoded CATEGORY_META */ });
  }, []);

  // Category meta: prefer managed (DB) categories, fall back to hardcoded map.
  const metaOf = useMemo(() => {
    const dyn: Record<string, { icon: string; short: string; desc: string }> = {};
    catList.forEach(c => { dyn[c.name] = { icon: c.icon || 'bi-clipboard-check', short: c.short_label || c.name, desc: c.description || '' }; });
    return (c: string) => dyn[c] || catMeta(c);
  }, [catList]);

  const usedCats = useMemo(() => {
    const order = catList.length ? catList.map(c => c.name) : CATEGORIES;
    const withVendors = order.filter(c => vendors.some(v => v.category === c));
    const extra = Array.from(new Set(vendors.map(v => v.category))).filter(c => c && !order.includes(c));
    return [...withVendors, ...extra];
  }, [vendors, catList]);
  const totalVendors = vendors.length;
  const countFor = (c: string) => vendors.filter(v => v.category === c).length;
  const usedStates = useMemo(
    () => Array.from(new Set(vendors.map(v => v.state).filter(Boolean) as string[])).sort(),
    [vendors]
  );

  // Results only show once the visitor searches, picks a category or a state.
  const hasQuery = search.trim() !== '' || activeCat !== '' || activeState !== '';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vendors.filter(v =>
      (activeCat === '' || v.category === activeCat) &&
      (activeState === '' || v.state === activeState) &&
      (!q || v.company.toLowerCase().includes(q) || v.address.toLowerCase().includes(q) || (v.contact_person || '').toLowerCase().includes(q))
    );
  }, [vendors, search, activeCat, activeState]);

  const groups = usedCats
    .map(cat => ({ cat, list: filtered.filter(v => v.category === cat) }))
    .filter(g => g.list.length > 0);

  const resetView = () => { setSearch(''); setActiveCat(''); setActiveState(''); };
  const openCategory = (c: string) => {
    setActiveCat(c);
    setTimeout(() => document.getElementById('vnd-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const printResults = () => {
    const rows = filtered.map((v, i) => `<tr>
      <td>${i + 1}</td><td>${v.company}${v.manufacturer ? ` (* ${v.manufacturer})` : ''}</td>
      <td>${v.category}</td>
      <td>${[v.contact_person, v.tel, v.email].filter(Boolean).join('<br>')}</td>
      <td>${v.address || ''}</td><td>${fmtDate(v.expiry_date)}</td></tr>`).join('');
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`<html><head><title>SCM Approved Vendors</title>
      <style>body{font-family:Arial,sans-serif;color:#33455e;padding:24px;}
      h1{color:#1e3a5f;font-size:18px;} .sub{color:#8a97ad;font-size:12px;margin-bottom:16px;}
      table{width:100%;border-collapse:collapse;font-size:12px;} th{background:#1e3a5f;color:#fff;text-align:left;padding:8px;}
      td{border-bottom:1px solid #e5e5e5;padding:8px;vertical-align:top;}</style></head>
      <body><h1>SCM Approved Vendors / Service Suppliers</h1>
      <div class="sub">${activeCat ? metaOf(activeCat).short + ' · ' : ''}${activeState ? activeState + ' · ' : ''}${filtered.length} record(s) · Printed ${new Date().toLocaleDateString('en-GB')}</div>
      <table><thead><tr><th>No</th><th>Company</th><th>Category</th><th>Contact</th><th>Address</th><th>Expiry</th></tr></thead>
      <tbody>${rows}</tbody></table></body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  return (
    <>
      <VendorRegistrationModal isOpen={regOpen} onClose={() => setRegOpen(false)} />

      <HeroInner
        title="Approved Vendors"
        image="/image/survey-inspection-min.png"
        crumbs={[
          { label: 'Resources' },
          { label: 'Technical Information' },
          { label: 'Vendors' },
        ]}
      />

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technical Information</span>
            <h2 className="section-title">SCM Approved Vendors / Service Suppliers</h2>
            <p className="section-subtitle">
              Search our directory of SCM approved vendors and service suppliers, organised by service category.
            </p>
          </div>

          {/* Corporate stat strip */}
          <div className="vnd-stats">
            <div className="vnd-stat"><strong>{totalVendors}</strong><span>Approved Vendors</span></div>
            <div className="vnd-stat"><strong>{usedCats.length}</strong><span>Service Categories</span></div>
            <div className="vnd-stat"><strong>SCM</strong><span>Audited &amp; Verified</span></div>
          </div>

          {/* Search bar */}
          <div className="vnd-searchbar">
            <div className="vnd-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search company, contact person or location…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button className="vnd-search-clear" onClick={() => setSearch('')} aria-label="Clear"><i className="bi bi-x-lg"></i></button>}
            </div>
            <div className="vnd-cat-wrap">
              <select value={activeCat} onChange={e => setActiveCat(e.target.value)} className="vnd-cat-select">
                <option value="">All Service Categories</option>
                {usedCats.map(c => <option key={c} value={c}>{metaOf(c).short}</option>)}
              </select>
              <i className="bi bi-chevron-down"></i>
            </div>
            <div className="vnd-cat-wrap" style={{ flex: '1 1 200px' }}>
              <select value={activeState} onChange={e => setActiveState(e.target.value)} className="vnd-cat-select">
                <option value="">All Regions</option>
                {usedStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
          <p className="vnd-search-hint">
            <i className="bi bi-info-circle"></i> Start typing or pick a category below to find an approved vendor.
          </p>

          {/* ── DISCOVERY (no active query) ── */}
          {!hasQuery ? (
            <>
              <div className="vnd-disc-head">
                <h3>Browse by Service Category</h3>
                <p>Select a category to view its approved vendors and service suppliers.</p>
              </div>
              <div className="row g-4">
                {usedCats.map(cat => {
                  const m = metaOf(cat);
                  return (
                    <div className="col-lg-3 col-md-6" key={cat}>
                      <button className="vnd-disc-card" onClick={() => openCategory(cat)}>
                        <div className="vnd-disc-icon"><i className={`bi ${m.icon}`}></i></div>
                        <h4>{m.short}</h4>
                        <div className="vnd-disc-count">
                          <span>View suppliers</span>
                          <span className="n">{countFor(cat)}</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* ── RESULTS ── */
            <div id="vnd-results">
              <div className="vnd-results-bar">
                <p>
                  Showing <strong>{filtered.length}</strong> vendor{filtered.length !== 1 ? 's' : ''}
                  {activeCat ? <> in <strong>{metaOf(activeCat).short}</strong></> : null}
                  {search.trim() ? <> matching “<strong>{search.trim()}</strong>”</> : null}
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {filtered.length > 0 && (
                    <button className="vnd-print-btn" onClick={printResults}>
                      <i className="bi bi-printer"></i> Print / PDF
                    </button>
                  )}
                  <button className="vnd-back-btn" onClick={resetView}>
                    <i className="bi bi-grid-3x3-gap"></i> Back to categories
                  </button>
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}><div className="spinner-border spinner-border-sm me-2"></div> Loading vendors…</div>
              ) : groups.length === 0 ? (
                <div className="vnd-empty"><i className="bi bi-search"></i><p>No vendors match your search.</p></div>
              ) : groups.map(({ cat, list }) => (
                <div key={cat} className="vnd-cat-block">
                  <div className="vnd-cat-title">
                    <i className={`bi ${metaOf(cat).icon}`}></i>
                    <span>{cat}</span>
                    <span className="vnd-cat-count">{list.length}</span>
                  </div>
                  <div className="vnd-table-wrap">
                    <table className="vnd-table">
                      <thead>
                        <tr>
                          <th style={{ width: '48px' }}>No</th>
                          <th style={{ width: '20%' }}>Company</th>
                          <th style={{ width: '30%' }}>Contact</th>
                          <th>Address</th>
                          <th style={{ width: '120px' }}>Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((v, i) => (
                          <tr key={v.id}>
                            <td className="vnd-no">{i + 1}</td>
                            <td className="vnd-company">
                              <button className="vnd-company-btn" onClick={() => setDetail(v)}>{v.company}</button>
                              {v.manufacturer && <span className="vnd-mfr">* {v.manufacturer}</span>}
                            </td>
                            <td className="vnd-contact">
                              <div><span>Contact</span> {v.contact_person || '-'}</div>
                              <div><span>Tel</span> {v.tel || '-'}</div>
                              <div><span>Fax</span> {v.fax || '-'}</div>
                              <div><span>Email</span> {v.email ? <a href={`mailto:${v.email}`}>{v.email}</a> : '-'}</div>
                            </td>
                            <td className="vnd-address">{v.address}</td>
                            <td>
                              {(() => {
                                const st = expiryStatus(v.expiry_date);
                                return (
                                  <span className={`vnd-expiry ${st === 'expired' ? 'vnd-expired' : st === 'soon' ? 'vnd-soon' : ''}`}>
                                    {fmtDate(v.expiry_date)}{st === 'soon' ? ' · soon' : ''}
                                  </span>
                                );
                              })()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {list.some(v => v.manufacturer) && (
                    <p className="vnd-note"><span>*</span> Authorized Manufacturer</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="vnd-verify">
            <i className="bi bi-shield-check"></i>
            <div>
              <strong>Verifying an approved vendor.</strong> Vendors listed here are approved SCM service suppliers, each with a validity (expiry) date. Always confirm the approval is still valid before engaging a supplier. To verify a vendor&apos;s status, email <a href="mailto:infohq@myscm.com.my">infohq@myscm.com.my</a> with the company name. Directory updated regularly by SCM.
            </div>
          </div>
        </div>
      </section>

      {/* ── Become an Approved Vendor ── */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Service Suppliers</span>
            <h2 className="section-title">Become an SCM Approved Vendor</h2>
            <p className="section-subtitle">Join our directory of approved service suppliers in four simple steps.</p>
          </div>
          <div className="vnd-proc-grid">
            {[
              { n: 1, t: 'Register Online', d: 'Complete the online registration form with your company and service details.' },
              { n: 2, t: 'Review & Audit', d: 'SCM reviews your submission and conducts a vendor assessment where applicable.' },
              { n: 3, t: 'Approval', d: 'Approved vendors are issued an approval with a validity period.' },
              { n: 4, t: 'Get Listed', d: 'Your company appears in this public approved-vendor directory.' },
            ].map(s => (
              <div className="vnd-proc-step" key={s.n}>
                <div className="n">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 34 }}>
            <h3 style={{ fontSize: 18, color: 'var(--color-heading)', marginBottom: 4 }}>What you&apos;ll need</h3>
            <div className="vnd-req-list">
              {['SSM Registration Certificate', 'Company Profile', 'Relevant accreditations (ISO, etc.)', 'Equipment & personnel details', 'Service category'].map(r => (
                <span className="vnd-req" key={r}><i className="bi bi-check-circle-fill"></i> {r}</span>
              ))}
            </div>
          </div>

          <div className="au-cta-box" style={{ marginTop: 40 }}>
            <div className="au-cta-left">
              <h2>Ready to Register?</h2>
              <p>Provide marine survey or service-supplier services? Register online to join our approved vendor directory.</p>
            </div>
            <div className="au-cta-right">
              <button className="au-btn-primary" onClick={() => setRegOpen(true)}>
                <i className="bi bi-person-plus-fill"></i> Register as a Vendor
              </button>
              <a href="/contact" className="au-btn-outline">
                <i className="bi bi-envelope-fill"></i> Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vendor detail modal ── */}
      {detail && (
        <div className="vndm-overlay" onClick={e => { if (e.target === e.currentTarget) setDetail(null); }}>
          <div className="vndm-modal">
            <div className="vndm-head">
              <div className="vndm-cat">{detail.category}</div>
              <h3>{detail.company}</h3>
              <button className="vndm-close" onClick={() => setDetail(null)} aria-label="Close"><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="vndm-body">
              {metaOf(detail.category).desc && <div className="vndm-scope"><i className="bi bi-info-circle"></i> {metaOf(detail.category).desc}</div>}
              {detail.manufacturer && <div className="vndm-row"><span className="k">Manufacturer</span><span className="v">{detail.manufacturer} <em style={{ color: 'var(--color-accent)' }}>(Authorized)</em></span></div>}
              <div className="vndm-row"><span className="k">Contact Person</span><span className="v">{detail.contact_person || '—'}</span></div>
              <div className="vndm-row"><span className="k">Telephone</span><span className="v">{detail.tel ? <a href={`tel:${detail.tel.replace(/\s/g, '')}`}>{detail.tel}</a> : '—'}</span></div>
              <div className="vndm-row"><span className="k">Fax</span><span className="v">{detail.fax || '—'}</span></div>
              <div className="vndm-row"><span className="k">Email</span><span className="v">{detail.email ? <a href={`mailto:${detail.email}`}>{detail.email}</a> : '—'}</span></div>
              <div className="vndm-row"><span className="k">Address</span><span className="v">{detail.address || '—'}</span></div>
              {detail.state && <div className="vndm-row"><span className="k">Region</span><span className="v">{detail.state}</span></div>}
              <div className="vndm-row"><span className="k">Approval Expiry</span><span className="v">
                {(() => { const st = expiryStatus(detail.expiry_date); const c = st === 'expired' ? '#d33' : st === 'soon' ? '#b45309' : '#2e7d32';
                  return <span style={{ color: c, fontWeight: 600 }}>{fmtDate(detail.expiry_date)}{st === 'expired' ? ' · Expired' : st === 'soon' ? ' · Expiring soon' : ''}</span>; })()}
              </span></div>
            </div>
            <div className="vndm-actions">
              {detail.email && <a className="vndm-btn vndm-btn-primary" href={`mailto:${detail.email}`}><i className="bi bi-envelope-fill"></i> Email Vendor</a>}
              {detail.address && <a className="vndm-btn vndm-btn-outline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail.address)}`} target="_blank" rel="noreferrer"><i className="bi bi-geo-alt-fill"></i> View on Map</a>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
