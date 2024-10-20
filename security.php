<?php

define ('HMAC_SHA256', 'sha256');
define ('SECRET_KEY', '23c5a5aedc2f401ea643701510244739988807e6fda6421c9959ebb085b2c95abbc6f2bb5f924e7eb2998a3ec3f22072a8c439d3e6874664a61202be5d5984c465ab1f71ab224aa4b04cd146d03a2f5834a228299e0f4ef98b205c26068f339fb7115a2e1a324ee2832040c9e11ba04c757724014a5b462db78e44a43f29ff55');

function sign ($params) {
  return signData(buildDataToSign($params), SECRET_KEY);
}

function signData($data, $secretKey) {
    return base64_encode(hash_hmac('sha256', $data, $secretKey, true));
}

function buildDataToSign($params) {
        $signedFieldNames = explode(",",$params["signed_field_names"]);
        foreach ($signedFieldNames as $field) {
           $dataToSign[] = $field . "=" . $params[$field];
        }
        return commaSeparate($dataToSign);
}

function commaSeparate ($dataToSign) {
    return implode(",",$dataToSign);
}

?>
