import { randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from "next";
import MultiParty from "multiparty";
import { s3 } from '../../utils/s3'
import { createWebhooookHandler } from "../../utils/createWebhooookHandler";
import { handleFile } from '../upload/handleFile';

export default createWebhooookHandler((req, res) => {
  const { data } = req.body.event;
  res.send(data)
});

