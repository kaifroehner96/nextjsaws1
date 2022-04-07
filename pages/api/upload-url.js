import aws from 'aws-sdk';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: "AKIAROVKBZYDJ53WPJXL",
    secretAccessKey: "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",
    region: "eu-central-1",
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: "bucketp999",
    Fields: {
      key: req.query.file,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0,10000000000000000    ] // 1048576], // up to 1 MB
    ],
  });

  res.status(200).json(post);
}
