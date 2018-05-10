<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" encoding="utf-8" />
  <xsl:template match="/">
          <xsl:apply-templates />
  </xsl:template>

  <xsl:template match="page/header">
    <div class="py25 kg-bg-blue kg-white">
      <h1 class="fl ml25 kg-white"><xsl:value-of select="number/contenttext" /></h1>
      <h2 class="mx100 kg-white"><xsl:value-of select="title/contenttext" /></h2>
    </div>
  </xsl:template>

  <xsl:template match="page/cards/card">
    <div class="mx100">
      <h2><xsl:value-of select="label" /></h2>

      <xsl:apply-templates />

    </div>
  </xsl:template>

  <xsl:template match="page/call-to-action">
    <div class="py25 kg-bg-blue kg-white">
      <h3 class="fl ml25 kg-white"><xsl:value-of select="contenttext" /></h3>
    </div>
  </xsl:template>

  <xsl:template match="contentparagraph">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="contentparagraph/contenttext">
    <xsl:element name="span">
      <xsl:attribute name="class">db</xsl:attribute>
      <xsl:apply-templates select="@align-text"/>
      <xsl:value-of select="." />
    </xsl:element>
  </xsl:template>

  <xsl:template match="contentparagraph/contentimage">
    <xsl:element name="img">
      <xsl:attribute name="resource">
        <xsl:value-of select="@resource"/>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>

  <xsl:template match="contentparagraph/contenttext/@text-align">
    <xsl:attribute name="text-align">
      <xsl:value-of select="@text-align"/>
    </xsl:attribute>
  </xsl:template>

</xsl:stylesheet>