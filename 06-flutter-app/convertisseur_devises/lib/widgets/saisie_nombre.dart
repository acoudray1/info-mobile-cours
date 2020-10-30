import 'package:convertisseur_devises/styles.dart';
import 'package:flutter/material.dart';

class SaisieNombre extends StatelessWidget {
  SaisieNombre({
    Key key,
    @required this.onChanged})
  : super(key: key);

  final void Function(String) onChanged;

  @override
  Widget build(BuildContext context) {
    return TextField(
      style: AppStyle.inputStyle,
      onChanged: onChanged,
    );
  }
}